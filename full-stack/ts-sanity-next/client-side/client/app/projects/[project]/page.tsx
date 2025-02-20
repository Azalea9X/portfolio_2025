import { getProject } from "@/app/components/schemaTypes/sanity-utils";
import { PortableText } from "next-sanity";
import Image from "next/image";

type Props = {
  params: {
    project: string;
  };
};

type Project = {
  _id: string;
  title: string;
  content: any;
  image: {
    asset: {
      url: string;
    };
  };
};

export default async function Project({ params }: Props) {
  try {
    const slug = await params.project;
    const project = await getProject(slug);

    if (!project) {
      throw new Error("Project not found");
    }

    return (
      <div className="project-card prose prose-md relative
        xxs:left-[0%] top-[3%]
        xs:left-[0%]
        sm: left-[5rem] top-[6%]  min-w-[31.25rem] max-w-[37.5rem]
        md:left-[10rem]
        min-w-[250px]
        lg:left-[3rem] top-[-8rem] translate
        min-w-[250px]
        xl:left-[3.5rem] top-[-20%]
        2xl:left-[38.625rem] top-[-10.25rem] min-w-[43rem] w-[50rem] scale
        3xl:left-[33rem] top-[-8rem] min-w-[33rem] max-w-[50rem] w-[45rem] scale    
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
          <Image
            src={project.image.asset.url}
            alt={project.title}
            width={500}
            height={300}
            className="rounded-lg object-cover w-full images"
            layout="responsive"
          />
        )}
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Error: {error.message}</div>;
  }
}

function renderRichText(content: any) {
  return <PortableText value={content} />;
}