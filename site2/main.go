package main

import (
	"context"
	"embed"
	"net"
	"net/http"
	"net/http/fcgi"
	"strings"

	"go.mukunda.com/site2/plates"
)

//go:generate ./gen.py

//go:embed gens/*
var embedFS embed.FS

//var plates = template.Must(template.ParseFS(templateFS, "templates/*"))

type myHandler struct{}

// // ---------------------------------------------------------------------------------------
// func getErrorTemplate() *template.Template {
// 	if errorTemplate != nil {
// 		return errorTemplate
// 	}

// 	tmpl, err := template.New("error").Parse("[Error Loading Template]")
// 	if err != nil {
// 		panic("Error creating error template")
// 	}
// 	errorTemplate = tmpl

// 	return errorTemplate
// }

// // ---------------------------------------------------------------------------------------
// func getTemplate(name string) *template.Template {
// 	if tmpl, ok := templateCache[name]; ok {
// 		return tmpl
// 	}

// 	// Load the template from the templates folder
// 	content, err := templateFS.ReadFile("templates/" + name)
// 	if err != nil {
// 		return getErrorTemplate()
// 	}

// 	// Cache the template for future use
// 	tmpl, err := template.New(name).Parse(string(content))
// 	if err != nil {
// 		return getErrorTemplate()
// 	}
// 	templateCache[name] = tmpl

// 	return tmpl
// }

// func plateStr(name string, data any) string {
// 	var res bytes.Buffer

// 	if err := plates.ExecuteTemplate(&res, name, data); err != nil {
// 		return "[Error rendering template]"
// 	}

// 	return res.String()
// }

// ---------------------------------------------------------------------------------------
// func MainPage() string {
// 	var body = plateStr("mainpage.html", nil)
// 	var s = struct {
// 		Body template.HTML
// 	}{
// 		Body: template.HTML(body),
// 	}
// 	var res bytes.Buffer

// 	if err := plates.ExecuteTemplate(&res, "head.html", s); err != nil {
// 		return "[Error rendering template]"
// 	}

// 	return res.String()
// }

// ---------------------------------------------------------------------------------------
func (h *myHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	if r.URL.Path == "/" {
		err := plates.MainPage().Render(context.Background(), w)
		if err != nil {
			http.Error(w, "Internal error", http.StatusInternalServerError)
		}
		return
	}

	if strings.HasPrefix(r.URL.Path, "/mysite2/gens/") {
		http.ServeFileFS(w, r, embedFS, r.URL.Path[9:])
		return
	}

	// Debug only - these are normally served by the above layer.
	if strings.HasPrefix(r.URL.Path, "/mysite2/res/") {
		http.ServeFile(w, r, r.URL.Path[9:])
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
