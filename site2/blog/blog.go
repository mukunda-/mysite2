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
	Name  string
	Date  string
	Pdate string
	Year  string
	Path  string
}

var blogContentPath string = "mysite2/blog-content/"
var gcache = cache.New(time.Minute*5, time.Minute*10)
var stripHeader = regexp.MustCompile(`^[\s\S]*?\r?\n\s*\r?\n`)

func SetBlogContentPath(path string) {
	blogContentPath = path
}

func renderHook(w io.Writer, node ast.Node, entering bool, folder string) (ast.WalkStatus, bool) {
	if img, ok := node.(*ast.Image); ok {
		if strings.HasPrefix(string(img.Destination), "media/") {
			img.Destination = []byte("/mysite2/blog-content/" + folder + "/" + string(img.Destination))
		}
	}
	return ast.GoToNext, false
}

func GetBlogIndex() []BlogHeader {
	if x, found := gcache.Get("index"); found {
		return x.([]BlogHeader)
	}

	files, err := os.ReadFile(blogContentPath + "/index.json")
	if err != nil {
		return []BlogHeader{}
	}

	// Parse the JSON
	var index []BlogHeader
	err = json.Unmarshal(files, &index)
	if err != nil {
		return []BlogHeader{}
	}

	gcache.Set("index", index, cache.DefaultExpiration)
	return index
}

func convertBlogHtmlContent(content string, path string) string {
	folder := strings.Split(path, "/")[0]
	content = stripHeader.ReplaceAllString(content, "")

	p := parser.New()
	doc := p.Parse([]byte(content))
	renderer := html.NewRenderer(html.RendererOptions{
		RenderNodeHook: func(w io.Writer, node ast.Node, entering bool) (ast.WalkStatus, bool) {
			return renderHook(w, node, entering, folder)
		},
	})
	return string(markdown.Render(doc, renderer))
}

func GetBlogHtmlContent(path string) string {
	ckey := "blog-" + path
	cached, ok := gcache.Get(ckey)
	if ok {
		return cached.(string)
	}

	path = blogContentPath + path + ".md"
	content, err := os.ReadFile(path)
	if err != nil {
		return ""
	}

	converted := convertBlogHtmlContent(string(content), path)
	gcache.Set(ckey, converted, cache.DefaultExpiration)
	return converted
}

func init() {
	cp := os.Getenv("BLOG_CONTENT_PATH")
	if cp != "" {
		blogContentPath = cp
	}
}
