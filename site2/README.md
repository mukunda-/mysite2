My web site, as served by Golang and templ.

### Points of interest
* blog - Blog reading and formatting utilities.
  * Reads from the blog-content repo checkout and converts markdown to HTML.
* ci - Docker configuration to cross-compile for Ubuntu
* plates - templ templates for the site
* res - Static resources
* scripts - TypeScript sources
* style - CSS sources

### Build
```
npm install
go generate .
go build
```

### Cross-compile for Ubuntu
A Dockerfile is included to build on Ubuntu. The `ci` folder has a compose service to 
build and copy the artifacts out.
```
cd ci
docker-compose up --build
```

### Local development on Windows
The npm scripts include a local development server with a FastCGI reverse proxy (test-server.js). `npm run dev` runs the script compilers in watch mode along with the reverse proxy. VS Code configs are included to run `templ generate` and launch the Go app together.
```
# For watching/compiling TypeScript and CSS
npm run dev

# Debugging the app (Or just 'launch' in vs code)
templ generate
go run .
```

### Deployment
* Build for the needed environment.
* Copy gens files to the server.
* Copy mysite2.fcgi to the server.
* Set up .htaccess with apache-htaccess.txt as reference to set up routes to the backend,
  calling the fcgi program.

`publish.py` contains the needed steps.

No automation for this currently.
