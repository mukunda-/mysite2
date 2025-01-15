import React from "react";
import { TopWrapper } from "../common";

export function NotFoundPage() {
   return <TopWrapper>
      <div className="text-center m-4">
         <p>
         Not found! If something was here before, it isn't anymore.
         </p>
         <p>
            <a href="/">Return to index</a>
         </p>
      </div>
   </TopWrapper>;
}
