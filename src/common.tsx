import React from "react";

//----------------------------------------------------------------------------------------
export function Bullet() {
   return <span className="bp1:w-[12px] bp1:h-[12px] absolute left-[-27px] top-[7px] bg-gray-700 block rounded-full"></span>;
}

//----------------------------------------------------------------------------------------
export function SectionHeader(props: {
   name: string;
}) {
   return <div className="section-header dissonance"><a href={`#${props.name}`}>
      <span className="bp1:absolute bp1:-left-9 bp1:-top-0 bp1:text-3xl">#</span>{props.name}</a>
   </div>;
}
