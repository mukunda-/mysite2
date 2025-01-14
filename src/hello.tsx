import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const Curtains = () => {
   return <div className="curtains"></div>;
};

const PrismText = (props: {
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

   // <div className={"prism-text-0 " + (showPrism ? ".prism-text-0-drop" : "")}
   //       style={{animation: `fade-out 0.1s ${delay+2}s forwards`}}
   //    >{props.children}</div>
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

function TopSpacer() {
   return <div className="h-[50vh]"></div>;
}

function NavButton(props: {
   children: React.ReactNode;
   href: string;
   order: number;
}) {
   const order = props.order ?? 0;
   return <a href={props.href}><div className="navbutton font-bold text-lg px-4 py-2 m-4 inline-block dissonance overflow-hidden" style={
      {
         animationDelay: `${order * 0.15}s`,
      }
   }>{props.children}</div></a>;
   
}

function NavBox(props: { children: React.ReactNode }) {
   //grid grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] gap-4
   return <div className="text-center">
      {props.children}
   </div>;
}

function Bullet() {
   return <span className="bp1:w-[12px] bp1:h-[12px] absolute left-[-27px] top-[7px] bg-[#fdfdfd] block rounded-full"></span>;
}

function BlogPost() {
   return <div className="blog-post mt-3">
      <div className="flex justify-between items-center">
         <div className="blog-post-title text-lg font-bold relative underline dissonance"><Bullet/>Can LLMs Solve Software Engineering?</div>
         <div className="blog-post-date text-sm opacity-70 font-light">2025-01-13</div>
      </div>
      <div className="blog-excerpt ">
         <p className="mb-3">
         No doubt you have noticed the excitement surrounding LLMs
and their ability to solve problems. Everyone wants to shape
them into disruptive products that will revolutionize old
processes, especially in the software engineering domain.
         </p>
         <p className="mb-3">But can LLMs really get past the wall of reasoning to write
good code? Honestly, I don't know for sure. There are big
bets on <i>agentic</i> workflows breaking the reasoning boundary,
but with my programmer background it's easy to remain
skeptical. Here is one way to look at it: when you ask an
LLM to multiply two very large numbers, such as
7380580207762439311 and 237196197329347341, no doubt an LLM
by itself will get it wrong, because the answer is not
written somewhere. However, today's models <i>do</i> get it
right by including training to generate code scripts,
basically using a calculator.
            </p>
            <p className="mb-3">In other words, basic arithmetic is a simple enough concept
for an LLM's training to handle, to translate the question
into code to execute... (Read more)</p>
      </div>
   </div>;
}

function SectionHeader(props: {
   name: string;
}) {
   return <div className="section-header dissonance"><a href={`#${props.name}`}>
      <span className="bp1:absolute bp1:-left-9 bp1:-top-0 bp1:text-3xl">#</span>{props.name}</a>
   </div>;
}

function Blog() {
   return <section className="blog-section content-section" id="blog">
      <SectionHeader name="blog"/>
      <BlogPost/>
      <BlogPost/>
   </section>;
}

function Bio() {
   return <section className="content-section" id="bio">
      <SectionHeader name="bio"/>
      <div className="float-right ml-4 mb-1 mt-2">
         <img className="float-right rounded-lg max-w-[250px] w-[50vw]" src="res/me.jpg"  />
         <p className="text-xs text-center">Venice, Italy</p>
      </div>
      <div className="bio-text">
         <p className="mb-4">
            Hi, I'm Mukunda Johnson, a software engineer with a non-traditional background.
            I didn't go to college or have any formal computer-science classes.
            I was home-schooled, and my youth involved a lot of construction, the family trade.
            I've built two houses from the grass up, living in the second one for the past several years.
            Programming is just something I've always enjoyed. Everything I know in tech has never involved a teacher, but I wouldn't discredit all of the amazing people in the developer community that have contributed to my knowledge over the last 25 years.
            I have an extensive history in hobbyist projects.
         </p>
         <p className="mb-4">
            For my professional life in tech, I've worked with many clients, from individuals to small businesses to enterprises;
            a lot of remote work recently, with the last role being with <a href="https://crossover.com">Crossover</a>.
            I've grown very competent with a wide range of technologies, given my broad history.
            I enjoy working with clients to reach practical solutions, and I'd like to think they enjoy working with me, too.
         </p>
         <p className="mb-4">
            If you're curious about my name's origin, it's inspired from <a href="https://www.iskcon.org/">ISKCON</a> culture,
            a branch of Hinduism that sprouted in New York in the 60s.
            The translation of <i>Mukunda</i> is "giver of liberation," and my middle name is Das, which indicates I'm the servant to the giver of liberation (God).
            I'm very open-minded and avoid religious comparisons or conversation for the most part, but the core values of ISKCON are vegetarianism,
            ethical living, and spiritual growth.
         </p>
         <p className="mb-4">
            For fun, if I'm not working on some odd project, I'm usually playing World of Warcraft.
            I enjoy raid-leading and performing with the top 0.5% of players in the world.
            I think it helps keep the brain refreshed.
            Most of my friends who I relate with have been "online," and that trend still continues.
            Other things I enjoy are writing, travel (when money and inspiration permits), and keeping fit.
            I've made it more of a priority recently to stay healthy.
         </p>
      </div>
   </section>;
}

function ProjectEntry(props: {
   name: string;
   year: number;
   href: string;
   stack: string;
   children: React.ReactNode;
}) {
   return <div className="project mb-4">
      <div className="flex gap-3 items-center">
         <div className="text-lg font-bold relative dissonance"><Bullet/><a href={props.href}>{props.name}</a></div>
         <div className="flex-grow"></div>
         <div className="font-light text-xs ">{props.stack}</div>
         <div className="font-light text-neutral-600">{props.year}</div>
         </div>
      {props.children}
   </div>;
}

function Projects() {
   return <section className="content-section" id="projects">
      <SectionHeader name="projects"/>
      <p className="mb-4">A handful of neat endeavors of mine. Much of my professional work is proprietary and/or can't be shared, so these are mostly hobbyist projects.</p>
      <div className="projects">
         <ProjectEntry name="Nanopaint" year={2025} href="https://github.com/mukunda-/nanopaint" stack="#golang #typescript #react">
            A collaborative canvas with infinite zoom. Not finished yet.
         </ProjectEntry>
         
         <ProjectEntry name="Dropnote" year={2024} href="https://www.getdropnote.com/" stack="#golang #typescript #react #wordpress">
            A SaaS-oriented application under development. Not available yet.
         </ProjectEntry>

         <ProjectEntry name="Puggle Chat" year={2023} href="https://puggle.chat" stack="#golang #typescript #react">
            An anonymous chat server. It's a rite of passage for a programmer to write a chat server.
         </ProjectEntry>

         <ProjectEntry name="Gig" year={2022} href="https://github.com/mukunda-/Gig" stack="#csharp">
            I wrote this as an exercise to get more familiar with C#. It's a handy personal tool to track time spent on tasks so I could chart it in a CSV later.
         </ProjectEntry>

         <ProjectEntry name="ovpnkeys" year={2021} href="https://github.com/mukunda-/ovpnkeys" stack="#python #openvpn">
            Honestly I don't remember much about this. I wanted to simplify creating openvpn profiles, and openssl is quite the rabbithole.
         </ProjectEntry>

         <ProjectEntry name="smtpy" year={2021} href="https://github.com/mukunda-/smtpy" stack="#python #email">
            This is a tool I made to simplify reproduction of issues with email networking. A <i>smtpyfile</i> contains delivery parameters and email content, and you can share that with your engineering team when ordering a fix.
         </ProjectEntry>

         <ProjectEntry name="Hobbyist Portfolio" year={2020} href="https://mukunda.com/portfolio" stack="#javascript #glsl #html">
            This is a WebGL application I made to demonstrate expertise in web development while also showing my older hobbyist projects. It uses no libraries and is written from scratch.
         </ProjectEntry>

         <ProjectEntry name="Game of Life" year={2020} href="https://mukunda.com/gameoflife/" stack="#javascript">
            A fun little implementation of Conway's Game of Life.
         </ProjectEntry>
         
         <ProjectEntry name="Tetris: Source" year={2014} href="https://github.com/mukunda-/vg-tetris" stack="#sourcemod">
            A tetris game that runs inside of Counter-Strike or other Source games. <a href="https://kotaku.com/you-shouldnt-interrupt-a-counter-strike-players-game-of-1596498787#!">Featured on Kotaku</a>.
         </ProjectEntry>

         <ProjectEntry name="Super Mareo Bruhs" year={2013} href="https://github.com/mukunda-/vg-supermareo" stack="#sourcemod">
            A Mario game that runs inside of Counter-Strike or other Source games. <a href="https://www.pcgamer.com/csgo-super-mareo-bruhs/">Featured on PC Gamer</a>. Extremely cool how this works internally - a completely server-side hosted game-within-a-game that had no intention of supporting such a thing. Smooth side-scrolling and all!
         </ProjectEntry>

         <ProjectEntry name="supernsf" year={2009} href="https://github.com/mukunda-/supernsf" stack="#assembly #nes #c">
            A ridiculously fun project that mixes PCM with a carefully crafted program with hand-counted CPU cycles to time the output of each sample. It sequences music using the NES audio channels, as well as extension channels from other supported chips.
         </ProjectEntry>

         <ProjectEntry name="Skipp and Friends" year={2009} href="https://www.romhacking.net/homebrew/72/" stack="#assembly #snes">
            Programming the SNES by yourself is not for the faint of heart. It was no wonder that the active developer community for this console could be counted on one hand. This is a fun little game that I made for the SNES, complete with audio support from my snesmod library. Music is from various friends in #mod_shrine EsperNet.
         </ProjectEntry>

         <ProjectEntry name="snesmod" year={2009} href="https://github.com/mukunda-/snesmod" stack="#assembly #snes #c++">
            This is a premium SNES audio library that supports streaming audio from the
            SNES processor to the SPC coprocessor while playing rich Impulse Tracker music.
         </ProjectEntry>

         <ProjectEntry name="Super Wings" year={2008} href="https://github.com/mukunda-/superwings" stack="#c #gba">
            A fun GameBoy® Advance game.
         </ProjectEntry>

         <ProjectEntry name="Maxmod" year={2008} href="https://maxmod.org/" stack="#asm #gba #ds">
            A comprehensive audio engine for the GameBoy® Advance and Nintendo DS. It supports several tracker music formats and software mixing. It can extend the Nintendo DS's 16 audio channels with additional software channels. Written entirely in ARM assembly.
         </ProjectEntry>
      </div>
      <p>You can visit my <a href="https://mukunda.com/projects.html">old projects page</a> that contains some other fun things. My <a href="https://mukunda.com/portfolio">Hobbyist Portfolio</a> also shows many of my old projects.</p>
   </section>;
}


function BusinessCard() {
   const mailSvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill inline-block" viewBox="0 0 16 16">
   <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
   </svg>;

   const phoneSvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill inline-block" viewBox="0 0 16 16">
   <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
   </svg>;

   return <div className="business-card flex border-2 rounded-lg w-[3.5in] h-[2in] p-4 px-5 box-border items-center justify-between relative m-auto">
   <div className="">
      <img src="res/bcard-qr.png" width="100px"/>
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

function Contact() {
   return <section className="content-section" id="contact">
      <SectionHeader name="contact"/>
      <p className="mb-4">Here is my virtual business card. You can print it if you like.</p>
      <BusinessCard/>
   </section>;
}

function Footer() {
   return <footer className="p-4 py-8 pb-16 m-auto text-center font-light text-xs">
      <p className="">© 2025 Mukunda Johnson — Designed with ❤️</p>
      <p><a href="#top">Back to top</a></p>
   </footer>;
}

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

function Root() {
   const [showNav, setShowNav] = useState(false);
   const [showContent, setShowContent] = useState(false);

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
                  <NavButton order={6} href="mailto:me@mukunda.com">#contact</NavButton>
               </NavBox>
            </>
         }
            {/* <div className="button">Blog</div>
            <div className="button">Bio</div>
            <div className="button">Projects</div>
            <div className="button">LinkedIn</div>
            <div className="button">GitHub</div>
            <div className="button">Email</div> */}
            {/* <p className="font-light text-[#f00] mix-blend-screen">“One learns by doing a thing; for though you think you know it, you have no certainty until you try.” – Sophocles</p>
            <p className="font-light text-[#0f0]   mix-blend-screen">“One learns by doing a thing; for though you think you know it, you have no certainty until you try.” – Sophocles</p>
            <p className="font-light text-[#00f]   mix-blend-screen ">“One learns by doing a thing; for though you think you know it, you have no certainty until you try.” – Sophocles</p>
            <p className="font-light text-sm">(C) 2025 Mukunda Johnson - Designed with 💖</p> */}

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
