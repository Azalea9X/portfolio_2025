import Image from "next/image";
import Link from "next/link";
import { getProjects } from "./components/schemaTypes/sanity-utils";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import Nav from './navbar';
import { Project } from "./components/types/projects";

import { PortableText } from '@portabletext/react'

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
        <main className="mx-auto p-4">
          <section className="projects">
            <h1 className="text-4xl relative font-extrabold text-center mb-4
                  xxs:text-2xl 
                  xs:top-[-9rem]
                  sm:text-5xl left-[-10rem]
                  md:text-4xl left-[-2rem] top-[2rem]
                  lg:text-5xl left-[-6rem] 
                  xl:text-6xl left-[2rem]
                  2xl:text-6xl left-[8rem]
                  4xl: my-[5rem] animate__animated animate__bounce
                  5xl: animate__animated animate__bounce
                  6xl: animate__bounceIn
                   ">Hi! I am Jacob Siegel!</h1>
          <div className="grid relative
  xs:grid-cols-1
  sm:grid-cols-1
  md:grid-cols-1
  lg:grid-cols-1
  xl:grid-cols-1
  2xl:grid-cols-2 left-[11rem] max-w-[50vw]
  4xl:grid-cols-2
  min-w-[100vw] left-[30vw]
  5xl:grid-cols-2
   max-w-[60vw] left-[-35vw]
">
              {projects.map((project: any) => (
                <div key={project._id} className="project-card prose prose-md relative
                xs:left-[3rem] top-[-3rem]
                sm:left-[-13rem] min-w-[95vw] top-[-6rem] max-w-[500px]
                md:left-[-6rem] top-[-6rem] min-w-[95vw] max-w-[600px]
                lg:left-[-2rem] min-w-[95vw] max-w-[900px]
                xl:left-[-1.5rem] min-w-[105vw] max-w-[900px]
                2xl: max-w-[15vw] left-[-26rem] top-[5rem]
                3xl:left-[-2.5rem] min-w-[140% !important]
              
                ">
                  <h2 className="text-2xl extra-bold relative left-[">{project.title}</h2>
                  <PortableText
                    value={project.content}
                    components={{
                      block: {
                        heading1: ({ children }) => (
                          <h1 className="text-3xl font-extrabold relative
                          ">{children}</h1>
                        ),
                        heading2: ({ children }) => (
                          <h2 className="text-2xl font-extrabold relative
                          xs:left-[4rem]">{children}</h2>
                        ),
                        heading3: ({ children }) => (
                          <h3 className="text-xl font-extrabold
                          relative
                          xs:left-[4rem]">{children}</h3>
                        ),
                        heading4: ({ children }) => (
                          <h4 className="text-lg font-extrabold">{children}</h4>
                        ),
                        normal: ({ children }) => (
                          <p className="text- leading-relaxed leading-[2]">{children}</p>
                        ),
                      },
                    }}
                  />

                  <Link
                    href={`/projects/${project.slug.current}`}
                    key={project._id} // Use project._id for the key
                    className="border-2 border-gray-500 rounded-lg p-1 hover:scale-105 hover:border-blue-500
                  ">Click here to follow to my project
                    {project.image && (
                      <Image
                        src={project.image.asset.url}
                        alt={project.title}
                        width={600} // Added width
                        height={400} // Added height
                        className="rounded-lg object-cover w-full images relative
                        xs:max-w-[500px] left-[-1rem]
                        "
                        style={{ width: '100%', height: 'auto' }}
                      />
                    )}
                  </Link>

                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}