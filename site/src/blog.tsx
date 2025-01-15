import React, { useEffect, useState } from "react";
import { BlogContent, BlogIndexEntry, Bullet, getBlogIndex, loadBlogContentFromPath, SectionHeader } from "./common";
import { Link } from "react-router-dom";

function formatDate(date?: string) {
   if (!date) return "Somewhen";

   const dateparts = date.split("-");
   const year = dateparts[0].substring(2);
   const month = dateparts[1].replace(/^0/, "");
   const day = dateparts[2].replace(/^0/, "");
   return month + "/" + day + "/" + year;
}
//----------------------------------------------------------------------------------------
function BlogExcerpt(props: {
   data?: BlogIndexEntry;
}) {

   const [content, setContent] = useState<BlogContent|undefined>(undefined);

   useEffect(() => {
      if (!props.data?.path) return;

      let cancel = false;
      void (async () => {
         if (!props.data?.path) return;
         const content = await loadBlogContentFromPath(props.data.path);
         if (cancel) return;
         setContent(content);
      })();

      return () => {
         cancel = true;
      };
   }, [props.data?.path]);

   if (!props.data) return <></>;
   const href = `/blog/${props.data?.path.replace(".md", "").replace(".txt", "")}`;
   const datestring = formatDate(props.data.pdate);

   return <div className="blog-post mt-3">
      <div className="flex justify-between items-center">
         <div className="blog-post-title text-lg font-bold relative underline dissonance"><Bullet/><Link to={href}>{props.data.name}</Link></div>
         <div className="blog-post-date text-sm opacity-70 font-light">{datestring}</div>
      </div>
      <div className="blog-content blog-excerpt"
         dangerouslySetInnerHTML={{ __html: content?.htmlContent ?? "" }}>
      </div>
      <div className="border-t-4 border-gray-300 text-center">
         <Link to={href}>Read more</Link>
      </div>
   </div>;
}

//----------------------------------------------------------------------------------------
export function Blog() {
   const [index, setIndex] = useState<BlogIndexEntry[]|undefined>([] as BlogIndexEntry[]);

   useEffect(() => {
      getBlogIndex().then((index) => {
         if (index) setIndex(index);
      });
   }, []);

   const excerpts: JSX.Element[] = [];
   for (let i = 0; i < 5; i++) {
      excerpts.push(<BlogExcerpt key={i} data={index ? index[i] : undefined}/>);
   }
   
   return <section className="blog-section content-section relative" id="blog">
      <SectionHeader name="blog"></SectionHeader>
      <Link to="/blog/index" className="text-normal font-bold absolute right-0 top-2.5">&gt;&gt; View All</Link>
      {excerpts}
      <p className="font-bold"><Link to="/blog/index" className="">&gt;&gt; Blog Index</Link></p>
   </section>;
}
