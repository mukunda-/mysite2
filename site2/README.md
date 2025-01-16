My web site, as served by Golang and templ.

* blog - Blog reading and formatting utilities.
  * Reads from the blog-content repo checkout and converts markdown to HTML.
* ci - Docker configuration to cross-compile for Ubuntu
* plates - templ templates for the site
* res - Static resources
* scripts - TypeScript sources
* style - CSS sources

Building:
```
npm install
go generate .
go build
```

Building on Windows for Ubuntu
```
cd ci
docker-compose up --build
```

Local development on Windows (requires FastCGI proxy forwarding to port 9000):
```
# For watching/compiling TypeScript and CSS
npm run dev

# Debugging the app
py gen.py
go run .
```

Includes VS Code tasks and launch configuration. The launch
configuration runs templ generate before each execution.