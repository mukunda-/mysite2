import React, { useEffect, useState } from 'react';
import { BlogIndexEntry, getBlogIndex, SectionHeader, TopWrapper } from '../common';
import { Link } from 'react-router-dom';

function Entry(props: {
   data: BlogIndexEntry;
}) {
   const dateparts = props.data.pdate.split("-");
   const year = dateparts[0].substring(2);
   const month = dateparts[1].replace(/^0/, "");
   const day = dateparts[2].replace(/^0/, "");
   return <tr>
      <td className="opacity-70 text-xs pr-2">{month + "/" + day + "/" + year}</td>
      <td className="font-bold">
         <Link to={"/blog/" + props.data.path}>{props.data.name}</Link>
      </td>
   </tr>;
}

//----------------------------------------------------------------------------------------
export function BlogIndex() {
   
   const [index, setIndex] = useState<BlogIndexEntry[]|undefined>([] as BlogIndexEntry[]);

   useEffect(() => {
      getBlogIndex().then((index) => {
         if (index) setIndex(index);
      });
   }, []);

   const entries: JSX.Element[] = [];
   if (index) {
      for (const i of index) {
         entries.push(<Entry key={i.name} data={i}/>);
      }
   }
   
   return <TopWrapper>
      <div className="p-4">
         <p className="font-bold"><Link to="/" className="">&lt;&lt; Home</Link></p>
         <div className="mt-20">
            <SectionHeader name="blog-index"></SectionHeader>
            <table>
               <tbody>
                  {entries}
               </tbody>
            </table>
            <footer className="text-xs mt-4 mb-10 text-center">
               <p className="mb-2">© 2025 Mukunda Johnson – Designed with ❤️</p>
               <p><a href="#top">Back to top</a> | <Link to="/">Home</Link></p>
            </footer>
         </div>
      </div>
   </TopWrapper>;
}