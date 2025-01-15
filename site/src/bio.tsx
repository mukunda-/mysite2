import React from 'react';
import { SectionHeader } from './common';

//----------------------------------------------------------------------------------------
export function Bio() {
   return <section className="content-section" id="bio">
      <SectionHeader name="bio"/>
      <div className="float-right ml-4 mb-1 mt-2">
         <img className="float-right rounded-lg max-w-[250px] w-[50vw]" src="/mysite2/res/me.jpg" alt="Picture of me" />
         <p className="text-xs text-center">Venice, Italy</p>
      </div>
      <div className="bio-text">
         <p className="mb-4">
            Hey there! I'm Mukunda Johnson, a seasoned self-taught developer. None of what I know today was ordered through a university or CS class. Programming is just something I've always enjoyed.
         </p>
         <p className="mb-4">
            Oddly enough, my interests are pretty bizarre to my family. I was home-schooled, and my family's trade is construction work; my youth involved a lot of that. I've built two houses from the grass up, living in the second one for the past several years.
         <p className="mb-4">
         </p>
            Despite the disconnection, I've spent nearly my entire life toying with computers. I have an extensive history in hobbyist projects. I say self-taught, but I wouldn't discredit all of the amazing people in the developer community that have contributed to my knowledge over the last 25 years.
         </p>
         <p className="mb-4">
            For my professional life in tech, I've worked with many clients, from individuals to small businesses to enterprises;
            a lot of remote work recently, with the last role being with <a href="https://crossover.com">Crossover</a>.
            I've grown very competent with a broad range of technologies.
            I enjoy working with clients to reach practical solutions, and they usually appreciate the thorough and proactive approach I take to consulting.
         </p>
         <p className="mb-4">
            If you're curious about my name's origin, it's inspired from <a href="https://www.iskcon.org/">ISKCON</a> culture,
            a branch of Hinduism that sprouted in New York in the 60s.
            The translation of <i>Mukunda</i> is <i>giver of liberation,</i> and my middle name is Das, which indicates I'm the servant to the giver of liberation (God).
            I'm very open-minded and avoid religious comparisons or conversation for the most part, but some core values of ISKCON are vegetarianism,
            sobriety, and ethical living.
         </p>
         <p className="mb-4">
            For fun, if I'm not working on some odd project like this landing page, I may be playing World of Warcraft.
            I enjoy raid-leading and performing with the top 0.5% of players worldwide.
            It helps keep the brain refreshed.
            Most of my friends who I relate with have been "online," and that trend still continues.
            Other things I enjoy are writing, travel (when money and inspiration permits), and keeping fit.
            I've made it more of a priority recently to stay healthy.
         </p>
      </div>
   </section>;
}
