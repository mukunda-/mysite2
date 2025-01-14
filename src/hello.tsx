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
   return <a href={props.href}><div className="navbutton font-bold text-lg px-4 py-2 m-4 inline-block dissonance" style={
      {
         animationDelay: `${props.order * 0.15}s`,
      }
   }>{props.children}</div></a>;
}

function NavBox(props: { children: React.ReactNode }) {
   //grid grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] gap-4
   return <div className="text-center">
      {props.children}
   </div>;
}

function BlogPost() {
   return <div className="blog-post mt-3">
      <div className="flex justify-between items-center">
         <div className="blog-post-title text-lg font-bold relative underline"><span className="w-[12px] h-[12px] absolute left-[-27px] top-[7px] bg-white block"></span>Can LLMs Solve Software Engineering?</div>
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

function Blog() {
   return <section className="blog-section content-section" id="blog">
      <div className="section-header dissonance"><a href="#blog">#blog</a></div>
      <BlogPost/>
      <BlogPost/>
   </section>;
}

function AboutMe() {
   return <section className="content-section" id="bio">
      <div className="section-header dissonance"><a href="#bio">#bio</a></div>
      <div className="float-right ml-4 mb-1 mt-2">
         <img className="float-right rounded-lg max-w-[250px] w-[50vw]" src="res/me.jpg"  />
         <p className="text-xs text-center">Venice, Italy</p>
      </div>
      <p className="mb-4">
         Hi, I'm Mukunda Johnson, a software engineer with a non-traditional background.
         I didn't go to college or start working in tech early.
         I was home-schooled, and my youth involved a lot of construction, the family trade.
         I've built two houses from the grass up, living in the second one for the past several years.
         Programming is just something I've always enjoyed. Everything I know in tech has never involved a teacher, but I wouldn't discredit all of the amazing people in the developer community that have contributed to my knowledge over the last 25 years.
         I have an extensive history in hobbyist projects.
      </p>
      <p className="mb-4">
         For my professional life in tech, I've worked with many clients, from individuals to small businesses to enterprises.
         A lot of remote work recently, with the last role being with <a href="https://crossover.com">Crossover</a>.
         I've grown very competent with a wide range of technologies, given my broad history.
         I enjoy working with clients to plot out solutions, and I'd like to think they enjoy working with me, too.
      </p>
      <p className="mb-4">
         If you're curious about my name's origin, it's inspired from the <a href="https://www.iskcon.org/">ISKCON</a> culture,
         a branch of Hinduism that sprouted in New York in the 60s. The translation of <i>Mukunda</i> is "liberator", and my middle name is Das, which indicates I'm the servant to.
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
   </section>;
}

function ContentSection() {
   
   return <>
      <Blog/>
      <AboutMe/>
   </>;
}

function Root() {
   const [showNav, setShowNav] = useState(false);
   const [showContent, setShowContent] = useState(false);

   useEffect(() => {
      setTimeout(() => {
         setShowNav(true);
      }, 0);//3500);
      setTimeout(() => {
         setShowContent(true);
      }, 0);//4000);
   }, []);
   
   return <>
      <div className="max-w-[800px] m-auto" >
         <TopSpacer/>
         <div className="px-4 text-2xl translate-y-[-50%] text-white text-center font-bold">
            <PrismText delay={3.5}>
            Dissonance is when two notes clash. &nbsp;Harmony is boring.
            </PrismText>
         </div>

         {
            showNav &&
            <>
               <NavBox>
                  <NavButton order={0} href="#blog">#blog</NavButton>
                  <NavButton order={1} href="#bio">#bio</NavButton>
                  <NavButton order={2} href="#projects">#projects</NavButton>
                  <NavButton order={3} href="https://linkedin.com/in/mukunda-johnson/">#linked-in</NavButton>
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

         {
            showContent && <ContentSection/>
         }
      </div>
      <Curtains/>
   </>;
}

void (async () => {
   console.log("Bonjour.");

   const container = document.getElementById('reactor')!;
   const root = createRoot(container);
   root.render(<Root />);
})();
