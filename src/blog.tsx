import React from "react";
import { Bullet, SectionHeader } from "./common";

//----------------------------------------------------------------------------------------
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

//----------------------------------------------------------------------------------------
export function Blog() {
   return <section className="blog-section content-section" id="blog">
      <SectionHeader name="blog"/>
      <BlogPost/>
      <BlogPost/>
   </section>;
}
