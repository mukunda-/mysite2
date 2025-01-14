import React, {useEffect, useRef} from "react";

export function Funground() {

   const canvas = useRef<HTMLCanvasElement>(null);
   const grid = useRef<Record<string,boolean>>({});
   const dirty = useRef<boolean>(true);

   useEffect(() => {
      if (!canvas.current) return; // No canvas yet.

      if (dirty.current) {
         // Redraw all.
         dirty.current = false;
         const ctx = canvas.current.getContext("2d");
         if (ctx) {
            ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
            ctx.fillStyle = "red";
            ctx.fillRect(0,0,100,100);
         }
      }
   }, [canvas.current]);

   return <div>
      <canvas ref={canvas} className="funground" width={2000} height={2000}></canvas>
   </div>;
}