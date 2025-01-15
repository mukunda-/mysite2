import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BlogContent, loadBlogContentFromPath, TopWrapper } from "../common";

function formatDate(date: string) {
   return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
   });
}

export function BlogPage() {
   const location = useLocation();
   const fullPath = location.pathname.replace('/blog/', '');
   console.log("Viewing", fullPath);
   const [content, setContent] = useState<BlogContent|undefined>(undefined);

   useEffect(() => {
      let cancel = false;

      (async () => {
         const ct = await loadBlogContentFromPath(fullPath);
         if (cancel) return;
         setContent(ct);
      })();

      return () => {
         cancel = true;
      };
   }, []);

   const date = content?.headers.date;
   const formattedDate = date && formatDate(date);

   return <TopWrapper>
      <div className="p-4">
         <p className="font-bold"><Link to="/blog/index" className="">&lt;&lt; Blog Index</Link></p>
         <div className="text-2xl font-bold mt-20">{content?.headers.name}</div>
         <div className="text-sm opacity-70">{formattedDate}</div>
         <div className="mt-4 blog-content" dangerouslySetInnerHTML={{ __html: content?.htmlContent ?? "" }}></div>
         <p className="font-bold"><Link to="/blog/index" className="">&lt;&lt; Blog Index</Link></p>
         <footer className="text-xs mt-4 mb-10 text-center">
            <p className="mb-2">© 2025 Mukunda Johnson – Designed with ❤️</p>
            <p><a href="#top">Back to top</a> | <Link to="/blog/index">Blog index</Link> | <Link to="/">Home</Link></p>
         </footer>
      </div>
   </TopWrapper>;
}
