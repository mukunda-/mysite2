import React, { useEffect, useState } from 'react';
import { Blog } from '../blog';
import { Bio } from '../bio';
import { Projects } from '../projects';
import { Contact } from '../contact';
import { NavBox, NavButton } from '../navbox';
import { Curtains, PrismText } from '../prismtext';
import { TopWrapper } from '../common';

//----------------------------------------------------------------------------------------
function TopSpacer() {
   return <div className="h-[50vh]"></div>;
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

let instaLoad = false;

if((window.performance.getEntries()[0] as PerformanceNavigationTiming)?.type == 'reload'){
   instaLoad = true;
}

const hash = window.location.hash;
if (hash) {
   instaLoad = true;
}

//----------------------------------------------------------------------------------------
export function MainPage() {

   const [showNav, setShowNav] = useState(instaLoad);
   const [showContent, setShowContent] = useState(instaLoad);
   instaLoad = true;

   useEffect(() => {
      setTimeout(() => {
         setShowNav(true);
      }, 3500);
      setTimeout(() => {
         setShowContent(true);
      }, 5000);
   }, []);
   
   return <TopWrapper>
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
   </TopWrapper>;
}
