import React from "react";
import { marked } from 'marked';


//----------------------------------------------------------------------------------------
export type BlogIndexEntry = {
   name: string;
   date: string;
   pdate: string;
   path: string;
   year: string;
};

//----------------------------------------------------------------------------------------
export type BlogContent = {
   headers: Record<string, string>;
   htmlContent: string;
};

//----------------------------------------------------------------------------------------
export function Bullet() {
   return <span className="bp1:w-[12px] bp1:h-[12px] absolute left-[-27px] top-[7px] bg-gray-600 block rounded-full"></span>;
}

//----------------------------------------------------------------------------------------
export function SectionHeader(props: {
   name: string;
   children?: React.ReactNode;
}) {
   return <div className="section-header dissonance"><a href={`#${props.name}`}>
      <span className="bp1:absolute bp1:-left-9 bp1:-top-0 bp1:text-3xl">#</span>{props.name}</a> {props.children}
   </div>;
}

//----------------------------------------------------------------------------------------
export async function loadBlogContent(content: string, path: string): Promise<BlogContent> {
   const year = path.split("/")[0];
   const lines = content.split("\n");
   let blogContent = "";

   const headers: Record<string, string> = {};
   for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() == "") {
         blogContent = lines.slice(i + 1).join("\n");
         break;
      }

      let [key, value] = lines[i].split(":");
      key = key.trim().toLowerCase();
      value = value.trim();
      headers[key] = value.trim();
   }

   const renderer = new marked.Renderer();
   renderer.image = ({href, title, text}) => {
     // Prepend the basePath to the image URL
     let newHref = href;
     if (newHref.startsWith("media/")) {
         newHref = `/mysite2/blog-content/${year}/` + newHref;
     }

     let result = `<img src="${newHref}" alt="${text}"`;
     if (title) {
       result += ` title="${title}"`;
     }
     result += '>';
     return result;
   };
   // renderer.code = (code, lang) => {

   // };
   
   // const myExt = {
   //    name: "poop",
   //    level: "block",
   //    start
   marked.setOptions({
      renderer
   });

   const htmlContent = await marked(blogContent);

   return {
      headers,
      htmlContent,
   };
}

//----------------------------------------------------------------------------------------
export async function loadBlogContentFromPath(path: string): Promise<BlogContent> {
   const text = await (await fetch(`/mysite2/blog-content/${path}.md`)).text();
   const content = await loadBlogContent(text, path);
   return content;
}

let blogIndexCache: BlogIndexEntry[]|undefined = undefined;

//----------------------------------------------------------------------------------------
export async function getBlogIndex() {
   if (blogIndexCache !== undefined) return blogIndexCache;

   try {
      // Bust the cache every 5 minutes.
      const cacheBuster = Math.floor(new Date().getTime() / (1000 * 60 * 5));
      blogIndexCache = await (await fetch(`/mysite2/blog-content/index.json?c=${cacheBuster}`)).json();
   } catch (e) {
      console.error("Couldn't load blog content.");
   }

   return blogIndexCache;
}

//----------------------------------------------------------------------------------------
export function TopWrapper(props: {children?: React.ReactNode}) {
   return <div className="max-w-[800px] m-auto" id="top" >
      {props.children}
   </div>;
}
