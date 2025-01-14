import React, { useEffect, useState } from "react";

export const Curtains = () => {
   return <div className="curtains"></div>;
};

export const PrismText = (props: {
   children: React.ReactNode;
   delay?: number;
}) => {
   const delay = props.delay ?? 0;
   const [showPrism, setShowPrism] = useState(false);

   useEffect(() => {
      setTimeout(() => {
         setShowPrism(true);
      }, delay*1000);
   }, []);

   return <div className=" prism-text relative">
      <div className={"prism-text-0 " + (showPrism ? "prism-text-0-drop" : "")}
      >{props.children}</div>
      {showPrism &&
         <>
            <div className="prism-text-1"
               style={{animation: `prism-text-1-animation2 1s 0s forwards`}}
            >{props.children}</div>
            <div className="prism-text-2"
               style={{animation: `prism-text-2-animation2 1s 0s forwards`}}
            >{props.children}</div>
            <div className="prism-text-3"
               style={{animation: `prism-text-3-animation2 1s 0s forwards`}}
            >{props.children}</div>
         </>
      }
   </div>;
};
