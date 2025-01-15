import React from "react";

//----------------------------------------------------------------------------------------
export function NavButton(props: {
   children: React.ReactNode;
   href: string;
   order: number;
}) {
   const order = props.order ?? 0;
   return <div className="navbutton font-bold text-lg px-4 py-2 m-4 inline-block dissonance overflow-hidden" style={
      {
         animationDelay: `${order * 0.15}s`,
      }
   }><a href={props.href}>{props.children}</a></div>;
   
}

//----------------------------------------------------------------------------------------
export function NavBox(props: { children: React.ReactNode }) {
   //grid grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] gap-4
   return <div className="text-center">
      {props.children}
   </div>;
}
