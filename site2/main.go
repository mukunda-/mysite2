package main

import (
	"context"
	"net"
	"net/http"
	"net/http/fcgi"
	"strings"

	"go.mukunda.com/site2/blog"
	"go.mukunda.com/site2/plates"
)

//go:generate ./gen.py

type myHandler struct{}

// ---------------------------------------------------------------------------------------
func (h *myHandler) InternalServerError(w http.ResponseWriter) {
	http.Error(w, "Something went wrong. Try reloading.", http.StatusInternalServerError)
}

// ---------------------------------------------------------------------------------------
func (h *myHandler) NotFound(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusNotFound)
	err := plates.NotFoundPage().Render(context.Background(), w)
	if err != nil {
		h.InternalServerError(w)
		return
	}
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

// ---------------------------------------------------------------------------------------
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

	h.NotFound(w, r)
}

// ---------------------------------------------------------------------------------------
func main() {
	var listener net.Listener

	if OS == "WINDOWS" {
		print("Starting server on port 9000.")
		// For Windows, we need to listen on a TCP port. 9000 is standard for FastCGI.
		var err error
		listener, err = net.Listen("tcp", ":9000")
		if err != nil {
			panic(err)
		}
		defer listener.Close()
	} else {
		print("Starting server on stdin/socket.")
		// For Linux, we listen on stdin. Note that this will panic if the application
		// is executed in a terminal, since stdin won't be a socket.
	}

	handler := new(myHandler)

	err := fcgi.Serve(listener, handler)
	if err != nil {
		panic(err)
	}
}
