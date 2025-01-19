package blog

import (
	"encoding/json"
	"io"
	"os"
	"regexp"
	"strings"
	"time"

	"github.com/gomarkdown/markdown"
	"github.com/gomarkdown/markdown/ast"
	"github.com/gomarkdown/markdown/html"
	"github.com/gomarkdown/markdown/parser"
	"github.com/patrickmn/go-cache"
)

// Blog reading utilities

type BlogHeader struct {
	Name string
	Date string
	Year string
	Path string
}

type BlogPost struct {
	Name string
	Date string
	Year string
	Path string
	Html string
}

// Where the files are located on disk, for loading the content and serving.
// Default is local mysite2 folder.
var blogContentLocalPath string = "mysite2/blog-content/"

// Where the files are located on the web server, for translating image paths.
var blogContentPath string = "/mysite2/blog-content/"

var gcache = cache.New(time.Minute*5, time.Minute*10)
var stripHeader = regexp.MustCompile(`^[\s\S]*?\r?\n\s*\r?\n`)

var noCache = false // Makes me think of Martin Korth :)

func SetBlogContentPath(path string) {
	blogContentPath = path
}

func GetBlogIndex() []BlogHeader {
	if x, found := gcache.Get("index"); found {
		return x.([]BlogHeader)
	}

	files, err := os.ReadFile(blogContentLocalPath + "/index.json")
	if err != nil {
		return []BlogHeader{}
	}

	// Parse the JSON
	var index []BlogHeader
	err = json.Unmarshal(files, &index)
	if err != nil {
		return []BlogHeader{}
	}

	if !noCache {
		gcache.SetDefault("index", index)
	}
	return index
}

func renderHook(w io.Writer, node ast.Node, entering bool, folder string) (ast.WalkStatus, bool) {
	if img, ok := node.(*ast.Image); ok {
		if strings.HasPrefix(string(img.Destination), "media/") {
			img.Destination = []byte(blogContentPath + folder + "/" + string(img.Destination))
		}
	}
	return ast.GoToNext, false
}

func convertBlogHtmlContent(content string, path string) BlogPost {
	content = strings.ReplaceAll(content, "\r", "")
	folder, _, _ := strings.Cut(path, "/")

	var result BlogPost

	for {
		header, rest, found := strings.Cut(content, "\n")
		if !found {
			return result
		}
		content = rest

		if strings.TrimSpace(header) == "" {
			break
		}

		key, value, found := strings.Cut(header, ":")
		if !found {
			continue
		}

		key = strings.TrimSpace(key)
		key = strings.ToLower(key)
		value = strings.TrimSpace(value)
		if key == "name" {
			result.Name = value
		} else if key == "date" {
			result.Date = value
		}
	}
	result.Year = folder // "Year" is a bad name, we really want the folder name.
	result.Path = path

	p := parser.New()
	doc := p.Parse([]byte(content))
	renderer := html.NewRenderer(html.RendererOptions{
		RenderNodeHook: func(w io.Writer, node ast.Node, entering bool) (ast.WalkStatus, bool) {
			return renderHook(w, node, entering, folder)
		},
	})
	result.Html = string(markdown.Render(doc, renderer))
	return result
}

func GetBlogHtmlContent(path string) BlogPost {
	ckey := "blog-" + path
	cached, ok := gcache.Get(ckey)
	if ok {
		return cached.(BlogPost)
	}

	filepath := blogContentLocalPath + path + ".md"
	content, err := os.ReadFile(filepath)
	if err != nil {
		return BlogPost{}
	}

	converted := convertBlogHtmlContent(string(content), path)

	if !noCache {
		gcache.SetDefault(ckey, converted)
	}

	return converted
}

func init() {
	{
		cp := os.Getenv("BLOG_CONTENT_PATH")
		if cp != "" {
			blogContentPath = cp
		}
	}

	{
		cp := os.Getenv("BLOG_CONTENT_LOCAL_PATH")
		if cp != "" {
			blogContentLocalPath = cp
		}
	}

	{
		nocache := os.Getenv("BLOG_NO_CACHE")
		if nocache == "yes" {
			noCache = true
		}
	}
}
