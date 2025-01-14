import React from "react";
import { Bullet, SectionHeader } from "./common";

//----------------------------------------------------------------------------------------
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

//----------------------------------------------------------------------------------------
export function Projects() {
   return <section className="content-section" id="projects">
      <SectionHeader name="projects"/>
      <p className="mb-4">A handful of neat endeavors of mine. Much of my professional work is proprietary and/or can't be shared, so these are mostly personal projects.</p>
      <div className="projects">
         <ProjectEntry name="Nanopaint" year={2025} href="https://github.com/mukunda-/nanopaint" stack="#golang #typescript #react">
            A fun collaborative canvas with infinite resolution. Not finished yet.
         </ProjectEntry>
         
         <ProjectEntry name="Dropnote" year={2024} href="https://www.getdropnote.com/" stack="#golang #k8s #typescript #react #nestjs #chrome-ext">
            A SaaS application. Golang container backend. React/Typescript client and Chrome extension. NestJS SaaS/infrastructure management backend. Still growing.
         </ProjectEntry>

         <ProjectEntry name="Puggle Chat" year={2023} href="https://puggle.chat" stack="#golang #typescript #react">
            An anonymous chat server. It's a rite of passage for a programmer to write a chat server.
         </ProjectEntry>

         <ProjectEntry name="Gig" year={2022} href="https://github.com/mukunda-/Gig" stack="#csharp">
            A handy personal tool to track time spent on tasks to chart in a CSV later. I wrote this when I needed to better manage my time in a flexible role; also to practice C#.
         </ProjectEntry>

         <ProjectEntry name="ovpnkeys" year={2021} href="https://github.com/mukunda-/ovpnkeys" stack="#python #openvpn">
            Honestly I don't remember much about this. I wanted to simplify creating openvpn profiles, and openssl is a very deep rabbit hole.
         </ProjectEntry>

         <ProjectEntry name="smtpy" year={2021} href="https://github.com/mukunda-/smtpy" stack="#python #email">
            This is a tool I made to simplify reproduction of issues with email networking. A <i>smtpyfile</i> contains delivery parameters and email content, basically a test case for your engineering team.
         </ProjectEntry>

         <ProjectEntry name="Hobbyist Portfolio" year={2020} href="https://mukunda.com/portfolio" stack="#javascript #glsl #html">
            This is a WebGL application I made to demonstrate expertise in web development while also showing my hobbyist projects. It uses no libraries and is written from scratch.
         </ProjectEntry>

         <ProjectEntry name="Game of Life" year={2020} href="https://mukunda.com/gameoflife/" stack="#javascript">
            An implementation of Conway's Game of Life.
         </ProjectEntry>
         
         <ProjectEntry name="Tetris: Source" year={2014} href="https://github.com/mukunda-/vg-tetris" stack="#sourcemod">
            A tetris game that runs inside of Counter-Strike or other Source games. <a href="https://kotaku.com/you-shouldnt-interrupt-a-counter-strike-players-game-of-1596498787#!">Featured on Kotaku</a>.
         </ProjectEntry>

         <ProjectEntry name="Super Mareo Bruhs" year={2013} href="https://github.com/mukunda-/vg-supermareo" stack="#sourcemod">
            A Mario game that runs inside of Counter-Strike or other Source games. <a href="https://www.pcgamer.com/csgo-super-mareo-bruhs/">Featured on PC Gamer</a>. Extremely cool how this works internally - a completely server-side hosted game-within-a-game that had no intention of supporting such a thing. Smooth side-scrolling and all!
         </ProjectEntry>

         <ProjectEntry name="supernsf" year={2009} href="https://github.com/mukunda-/supernsf" stack="#assembly #nes #c">
            A ridiculously fun project that mixes PCM via carefully crafted code. The CPU cycles were hand-counted to time the output of each sample. The sequencer also supports other NES audio channels and extension chips.
         </ProjectEntry>

         <ProjectEntry name="Skipp and Friends" year={2009} href="https://www.romhacking.net/homebrew/72/" stack="#assembly #snes">
            Programming the SNES by yourself is not for the faint of heart.
            It was no wonder that the active developer community for this console could be counted on one hand.
            This was a fun project, complete with audio support from my snesmod library.
            Music is from various friends in #mod_shrine EsperNet.
            This game is published via the <i>Super 4 in 1 Multicart</i>.
         </ProjectEntry>

         <ProjectEntry name="snesmod" year={2009} href="https://github.com/mukunda-/snesmod" stack="#assembly #snes #c++">
            This is a premium SNES audio library that supports streaming audio from the
            SNES processor to the SPC coprocessor while playing rich Impulse Tracker music.
            Only a few commercial SNES games like Star Ocean have that functionality.
         </ProjectEntry>

         <ProjectEntry name="Super Wings" year={2008} href="https://github.com/mukunda-/superwings" stack="#c #gba">
            A fun GameBoy® Advance game.
         </ProjectEntry>

         <ProjectEntry name="Maxmod" year={2008} href="https://maxmod.org/" stack="#asm #gba #ds">
            A comprehensive audio engine for the GameBoy® Advance and Nintendo DS. It supports several tracker music formats and software mixing. It can extend the Nintendo® DS's 16 audio channels with additional software channels. Written entirely in ARM assembly.
         </ProjectEntry>
      </div>
      <p>You can visit my <a href="https://mukunda.com/projects.html">old projects page</a> that contains some other fun things. My <a href="https://mukunda.com/portfolio">Hobbyist Portfolio</a> also shows many of my old projects.</p>
   </section>;
}

