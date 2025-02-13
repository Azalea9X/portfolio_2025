
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
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <section className="projects">
            <h1 className="text-4xl font-extrabold">I am Jacob Siegel!</h1>
            <div className="grid grid-cols-1 gap-[15rem] relative sm:grid-cols-2 lg:grid-cols-3 gap-[20rem]. ">
              {projects.map((project: Project) => (
                <div key={project._id} className="project-card prose prose-md ">
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
