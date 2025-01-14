import React from 'react';
import { SectionHeader } from './common';

//----------------------------------------------------------------------------------------
export function Bio() {
   return <section className="content-section" id="bio">
      <SectionHeader name="bio"/>
      <div className="float-right ml-4 mb-1 mt-2">
         <img className="float-right rounded-lg max-w-[250px] w-[50vw]" src="res/me.jpg" alt="Picture of me" />
         <p className="text-xs text-center">Venice, Italy</p>
      </div>
      <div className="bio-text">
         <p className="mb-4">
            Hi, I'm Mukunda Johnson, a software engineer with a non-traditional background.
            I didn't go to college or have any formal computer-science classes.
            I was home-schooled, and my youth involved a lot of construction work, the family trade.
            I've built two houses from the grass up, living in the second one for the past several years.
            Programming is just something I've always enjoyed. Everything I know in tech has never involved a teacher, but I wouldn't discredit all of the amazing people in the developer community that have contributed to my knowledge over the last 25 years.
            I have an extensive history in hobbyist projects.
         </p>
         <p className="mb-4">
            For my professional life in tech, I've worked with many clients, from individuals to small businesses to enterprises;
            a lot of remote work recently, with the last role being with <a href="https://crossover.com">Crossover</a>.
            I've grown very competent with a wide range of technologies, given my broad history.
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
