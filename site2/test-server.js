import express from "express";
import fs from "fs";
import * as url from 'url';
import dotenv from 'dotenv';
import fastcgi from 'fastcgi-client';
//import { createProxyMiddleware } from 'http-proxy-middleware';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
console.log("test-server dirname", __dirname);
dotenv.config();

const LISTEN_PORT = 80;
const fcgiOpts = {
    host: "127.0.0.1",
    port: 9000,
};

//----------------------------------------------------------------------------------------
function fastCgiRequest(req, res) {
   const client = fastcgi(fcgiOpts);

   let sentError = false;
   const sendError = () => {
      if (sentError) return;
      sentError = true;
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('FastCGI error');
   };
   
   client.on('ready', () => {
      const params = {
         SCRIPT_FILENAME: req.url,
         REQUEST_METHOD: req.method,
         CONTENT_TYPE: req.headers['content-type'] || '',
         CONTENT_LENGTH: req.headers['content-length'] || 0,
         QUERY_STRING: req.url.split('?')[1] || '',
         REQUEST_URI: req.url,
         DOCUMENT_URI: req.url,
         SERVER_PROTOCOL: 'HTTP/1.1',
         GATEWAY_INTERFACE: 'CGI/1.1',
         REMOTE_ADDR: req.socket.remoteAddress || '',
         REMOTE_PORT: req.socket.remotePort || '',
      };

      client.request(params, (err, request) => {
         if (err) {
            console.error('FastCGI Request Error:', err);
            sendError();
            return;
         }

         if (sentError) return;

         let response = "";

         request.stdout.on("data", data => {
            response += data;
         });
         request.stderr.on("data", data => {
         });
         request.stdout.on("end", () => {
            const parts = response.split(/\r?\n\r?\n/);
            const headerPart = parts[0];
            const bodyPart = parts.slice(1).join("\n");

            const headers = headerPart.split(/\r?\n/);
            for (let header of headers) {
               const [name, value] = header.split(": ");
               if (name == "Status") {
                  const [status, statusText] = value.trim().split(" ");
                  res.statusCode = parseInt(status);
                  res.statusMessage = statusText;
                  continue;
               }
               res.setHeader(name, value);
            }
            res.end(bodyPart);
         });
         request.stdin.end();

      });
   });

   client.on('error', (error) => {
      console.error('FastCGI Client Error:', error);
      sendError();
      // res.writeHead(500, { 'Content-Type': 'text/plain' });
      // res.send('FastCGI connection error');
   });
}

//----------------------------------------------------------------------------------------
function addRoutes(server) {

   // These routes are handled by the templating backend (our go app).
   server.get('/', (req, res) => {
      fastCgiRequest(req, res);
   });

   server.get('/blog/*', (req, res) => {
      fastCgiRequest(req, res);
   });

   // Static content.
   const blog_content = process.env.BLOG_CONTENT_LOCAL_PATH;
   console.log("Serving blog content from", blog_content);
   server.use('/mysite2/blog-content', express.static(blog_content));
   server.use("/mysite2", express.static('gens/mysite2'));
}

//----------------------------------------------------------------------------------------
function configAndStartServer() {
   const server = express();
   addRoutes(server);

   // Example reverse proxy configuration, to forward requests to a backend.
   // app.use('/api', createProxyMiddleware({
   //    target: 'http://localhost:9000',
   //    changeOrigin: true,
   // }));

   // For files not found, serve a 404 page.
   server.use(function(req, res, next) {
      res.status(404).send("404 Not Found");
   });

   server.listen(LISTEN_PORT, () => {
      console.log(`Test server listening on port ${LISTEN_PORT}!`);
   });
}

configAndStartServer();
