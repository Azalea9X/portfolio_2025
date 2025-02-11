
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
            <h1>My projects go here!</h1>
            <div className="grid grid-cols-1 gap-[15rem] sm:grid-cols-2 relative lg:top-[-600px !important]">
              {projects.map((project: Project) => (
                <div key={project._id} className="project-card prose prose-md text-gray-800
                ">
                  <h2 className="text-2xl font-bold">{project.title}</h2>
 {/* PortableText for rich text content */}
 

{(
  <>

<PortableText
  value={project.content}
  components={{
    block: {

      "heading1": ({ children }) => (
         
<h1 className="text-3xl font-bold relative lg:top-[-300px !important]">{children}</h1>
        ),
        "heading2": ({ children }) => (
          <h2 className="text-2xl font-bold">{children}</h2>
        ),
        "heading3": ({ children }) => (
          <h3 className="text-xl font-bold">{children}</h3>
        ),
        "heading4": ({ children }) => (
          <h4 className="text-lg font-bold">{children}</h4>
          ),
      normal: ({ children }) => (
         
        <p className="text-lg leading-relaxed leading-[2]">{children}</p>
        ),
    },
  }}

/>
 
  </>
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
