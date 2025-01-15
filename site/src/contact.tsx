import React from "react";
import { SectionHeader } from "./common";

//----------------------------------------------------------------------------------------
function BusinessCard() {
   const mailSvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill inline-block" viewBox="0 0 16 16">
   <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
   </svg>;

   const phoneSvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill inline-block" viewBox="0 0 16 16">
   <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
   </svg>;

   return <div className="business-card flex border shadow-lg  w-[3.5in] h-[2in] p-4 px-5 box-border items-center justify-between relative m-auto text-gray-900">
   <div className="">
      <img src="/mysite2/res/bcard-qr.png" width="100px" alt="QR Code for mukunda.com"/>
   </div>
   <div>
      <div className="business-card-headline text-sm font-medium absolute top-4 left-4 right-4 text-center tracking-[0.02em] leading-none">
         Development • Consulting • Freelancing
      </div>
      <div className="business-card-name text-lg font-bold leading-none">Mukunda Johnson</div>
      <div className="business-card-title text-md font-light dissonance">Software Engineer</div>
      <div className="business-card-contact absolute font-medium left-5 right-5 text-center bottom-4 text-xs tracking-wider flex justify-between leading-none">
         <div className="leading-none">
            {mailSvg} me@mukunda.com
         </div>
         <div className="leading-none">
            {phoneSvg} 601-463-5358
         </div>
      </div>
   </div>
</div>;
}

//----------------------------------------------------------------------------------------
export function Contact() {
   return <section className="content-section" id="contact">
      <SectionHeader name="contact"/>
      <p className="mb-4">Have a virtual business card. 🤝</p>
      <BusinessCard/>
      <p className="mt-4 mb-3">Resume and references are available on request only.</p>
      <p className="">Find me on: <a href="https://linkedin.com/in/mukunda-johnson/">LinkedIn</a> | <a href="https://x.com/_mukunda">Twitter/X</a> | <a href="https://github.com/mukunda-">GitHub</a></p>
   </section>;
}
