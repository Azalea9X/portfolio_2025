
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
        <main className="">
          <section className="projects">
            <h1 className="text-4xl relative font-extrabold
            xxs: text-2xl max-w-[300px] left-[5rem] top-[2rem]
            sm: left-[6rem]
            ">I am Jacob Siegel!</h1>
            <div className="grid relative
            xxs:grid-cols-1 top-[8rem] left-[5rem]
            xs:grid-cols-1
            sm: grid-cols-1 left-[5.2rem]
            
            ">
              {projects.map((project: Project) => (
                <div key={project._id} className="project-card prose prose-md xxs: min-w-[300px] 
                
                max-w-[350px] sm:min-w-[550px] max-w-[580px] 
                
                lg: min-w-[500px] max-h-[500px]">
                  <h2 className="text-2xl extra-bold">{project.title}</h2>
                       <PortableText
                    value={project.content}
                    components={{
                      block: {
                        heading1: ({ children }) => (
                          <h1 className="text-3xl  font-extrabold">{children}</h1>
                        ),
                        heading2: ({ children }) => (
                          <h2 className="text-2xl  font-extrabold">{children}</h2>
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
                    <Image src={project.image} 
                     alt={project.title}
                     width={300}
                     height={300}
                     className="rounded-lg object-cover"
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
