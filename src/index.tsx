import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Curtains, PrismText } from './prismtext';
import { Blog } from './blog';
import { Bio } from './bio';
import { Projects } from './projects';
import { Contact } from './contact';

//----------------------------------------------------------------------------------------
function TopSpacer() {
   return <div className="h-[50vh]"></div>;
}

//----------------------------------------------------------------------------------------
function NavButton(props: {
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
function NavBox(props: { children: React.ReactNode }) {
   //grid grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] gap-4
   return <div className="text-center">
      {props.children}
   </div>;
}

//----------------------------------------------------------------------------------------
function Footer() {
   return <footer className="p-4 py-8 pb-16 m-auto text-center font-light text-xs">
      <p className="mb-2">© 2025 Mukunda Johnson – Designed with ❤️</p>
      <p><a href="#top">Back to top</a></p>
   </footer>;
}

//----------------------------------------------------------------------------------------
function ContentSection(props: {
   show: boolean;
}) {
   
   return <div className={"fade-in-wait " + (props.show ? "fade-in" : "")}>
      <Blog/>
      <Bio/>
      <Projects/>
      <Contact/>
      <Footer/>
   </div>;
}

//----------------------------------------------------------------------------------------
function Root() {
   let instaLoad = false;
   if((window.performance.getEntries()[0] as PerformanceNavigationTiming)?.type == 'reload'){
      instaLoad = true;
   }
   const hash = window.location.hash;
   if (hash) {
      instaLoad = true;
   }

   const [showNav, setShowNav] = useState(instaLoad);
   const [showContent, setShowContent] = useState(instaLoad);

   useEffect(() => {
      setTimeout(() => {
         setShowNav(true);
      }, 3500);
      setTimeout(() => {
         setShowContent(true);
      }, 5000);
   }, []);
   
   return <>
      <div className="max-w-[800px] m-auto" id="top" >
         <TopSpacer/>
         <div className="px-4 text-2xl translate-y-[-50%] text-center font-bold overflow-hidden">
            <PrismText delay={3.5}>
            Dissonance is when two notes clash. &nbsp;Harmony is boring.
            </PrismText>
            <Curtains/>
         </div>

         {
            showNav &&
            <>
               <NavBox>
                  {/* <NavButton order={0} href="#blog">#blog</NavButton> */}
                  <NavButton order={1} href="#bio">#bio</NavButton>
                  <NavButton order={2} href="#projects">#projects</NavButton>
                  <NavButton order={3} href="https://linkedin.com/in/mukunda-johnson/">#linkedin</NavButton>
                  <NavButton order={4} href="https://github.com/mukunda-">#github</NavButton>
                  <NavButton order={5} href="https://mukunda.com/portfolio#">#hobbyist-portfolio</NavButton>
                  <NavButton order={6} href="#contact">#contact</NavButton>
               </NavBox>
            </>
         }
         <ContentSection show={showContent}/>
      </div>
   </>;
}

void (async () => {
   console.log("Bonjour.");

   const container = document.getElementById('reactor')!;
   const root = createRoot(container);
   root.render(<Root />);
})();
