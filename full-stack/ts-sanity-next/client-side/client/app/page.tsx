import Image from "next/image";
import { getProjects } from "./components/schemaTypes/sanity-utils";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import Nav from './navbar'; 
import { Project } from "./components/types/projects";

import {PortableText} from '@portabletext/react'
import {PortableTextComponents} from '@portabletext/react'

import project from "./components/schemaTypes/projectSchema";
import { PortableTextInput } from "sanity";
import { useEffect } from "react";

export default async function Home() {
  const projects: Project[] = await getProjects();

  if (!projects) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <Nav />
      <div className="relative">
        <main className="max-w-7xl mx-auto p-4">
          <section className="projects">
            <h1 className="text-4xl relative font-extrabold text-center mb-4
              xxs:text-2xl left-[-2rem]
              sm:text-3xl top-[1rem]
              md:text-4xl top-[.55rem]
              lg:text-5xl left-[7rem] top-[-12rem]
              xl:text-6xl text-center left-[11rem]
              2xl:left-[6rem] top-[-14rem]
              5xl: text-6xl text-center left-[1rem]
            ">Hi! I am Jacob Siegel!</h1>
            <div className="grid relative 
              xxs:grid-cols-1
              xs:grid-cols-1
              sm:grid-cols-1 
              md:grid-cols-1
              lg:grid-cols-2  
              xl:grid-cols-2 gap-4
              2xl:grid-cols-2 gap-4
              3xl:grid-cols-2
              5xl:grid-cols-3   ">
              {projects.map((project: Project) => (
                <div key={project._id} className="project-card prose prose-md relative 
                  xxs:left-[0%] top-[3%]
                  xs:left-[0%] 
                  sm: left-[5rem] top-[6%]  min-w-[31.25rem] max-w-[37.5rem]
                  md:left-[10rem]  
                  min-w-[250px]
                  lg:left-[3rem] top-[-8rem] translate
                  min-w-[250px]
                  xl:left-[3.5rem] top-[-20%] 
                  2xl:left-[15.625rem] top-[-10.25rem]
                  3xl:left-[8rem] top-[-8rem]
                  5xl:left-[10rem] top-[-8rem] min-w-[37.5rem]
                ">
                  <h2 className="text-2xl extra-bold">{project.title}</h2>
                  <PortableText
                    value={project.content}
                    components={{
                      block: {
                        heading1: ({ children }) => (
                          <h1 className="text-3xl font-extrabold">{children}</h1>
                        ),
                        heading2: ({ children }) => (
                          <h2 className="text-2xl font-extrabold">{children}</h2>
                        ),
                        heading3: ({ children }) => (
                          <h3 className="text-xl font-extrabold">{children}</h3>
                        ),
                        heading4: ({ children }) => (
                          <h4 className="text-lg font-extrabold">{children}</h4>
                        ),
                        normal: ({ children }) => (
                          <p className="text-lg leading-relaxed leading-[2]">{children}</p>
                        ),
                      },
                    }}
                  />
                  {project.image && (
                    <Image src={project.url} 
                      alt={project.title}
                      width={300} 
                      height={300} 
                      className="rounded-lg object-cover w-full" 
                      layout="responsive" 
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}