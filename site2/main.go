package main

import (
	"context"
	"embed"
	"net"
	"net/http"
	"net/http/fcgi"
	"strings"

	"go.mukunda.com/site2/blog"
	"go.mukunda.com/site2/plates"
)

//go:generate ./gen.py

//go:embed gens/*
var embedFS embed.FS

type myHandler struct{}

func (h *myHandler) InternalServerError(w http.ResponseWriter) {
	http.Error(w, "Internal error", http.StatusInternalServerError)
}

// ---------------------------------------------------------------------------------------
func (h *myHandler) NotFound(w http.ResponseWriter, r *http.Request) {
	http.NotFound(w, r)
}

// ---------------------------------------------------------------------------------------
func (h *myHandler) Root(w http.ResponseWriter, r *http.Request) {
	err := plates.MainPage().Render(context.Background(), w)
	if err != nil {
		h.InternalServerError(w)
		return
	}
}

// ---------------------------------------------------------------------------------------
func (h *myHandler) Blog(w http.ResponseWriter, r *http.Request) {
	post := blog.GetBlogHtmlContent(r.URL.Path[6:])
	if post.Name == "" || post.Html == "" {
		h.NotFound(w, r)
		return
	}

	err := plates.BlogPage(post).Render(context.Background(), w)
	if err != nil {
		h.InternalServerError(w)
		return
	}
}

func (h *myHandler) BlogIndex(w http.ResponseWriter, r *http.Request) {
	posts := blog.GetBlogIndex()
	err := plates.BlogIndexPage(posts).Render(context.Background(), w)
	if err != nil {
		h.InternalServerError(w)
		return
	}
}

// ---------------------------------------------------------------------------------------
func (h *myHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path := strings.ToLower(r.URL.Path)

	if path == "/" {
		h.Root(w, r)
		return
	}

	if path == "/blog/index" {
		h.BlogIndex(w, r)
		return
	}

	if strings.HasPrefix(path, "/blog/") {
		h.Blog(w, r)
		return
	}

	if strings.HasPrefix(path, "/mysite2/gens/") {
		http.ServeFileFS(w, r, embedFS, path[9:])
		return
	}

	// Debug only - these are normally served by the above layer.
	if strings.HasPrefix(path, "/mysite2/res/") {
		http.ServeFile(w, r, path[9:])
		return
	}

	http.NotFound(w, r)
}

// ---------------------------------------------------------------------------------------
func main() {
	var listener net.Listener

	if OS == "WINDOWS" {
		// Debug mode for windows, listening on a specific port.
		var err error
		listener, err = net.Listen("tcp", ":9000")
		if err != nil {
			panic(err)
		}
		defer listener.Close()
	}

	handler := new(myHandler)

	print("listening!")
	err := fcgi.Serve(listener, handler)
	if err != nil {
		panic(err)
	}
}
