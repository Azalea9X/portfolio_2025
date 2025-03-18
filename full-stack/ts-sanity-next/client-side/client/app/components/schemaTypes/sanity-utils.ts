import { createClient, groq } from "next-sanity";
import { Project } from "../types/projects";

const sanityClient = createClient({
  projectId: 'slqsfm7w',
  dataset: 'production',
});

const projectQuery = groq`*[_type == "project"] {
  _id,
  title,
  content,
  author -> {
    name
  },
  slug,
  "imageUrl": image.asset->url,
  image {
    alt,
    asset->{
      _id,
      url
    }
  }
}`;

export async function getProjects(): Promise<Project[]> {
  try {
    const projects = await sanityClient.fetch(projectQuery);
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const project = await sanityClient.fetch(
      groq`*[_type == "project" && slug.current == $slug][0] {
        _id,
        title,
        content,
        author -> {
          name
        },
        slug,
        "imageUrl": image.asset->url,
        image {
          alt,
          asset->{
            _id,
            url
          }
        }
      }`,
      { slug }
    );
    return project;
  } catch (err) {
    console.error('Error fetching project:', err);
    throw err;
  }
}

const pagesQuery = groq`*[_type == "page"] {
  _id,
  title,
  content,
  author -> {
    name
  },
  slug,
  "imageUrl": image.asset->url,
}`;

export async function getPages(): Promise<Project[]> {
  try {
    const pages = await sanityClient.fetch(pagesQuery);
    return pages;
  } catch (error) {
    console.error('Error fetching pages:', error);
    throw error;
  }
}

export async function getPage(slug: string): Promise<Project | null> {
  try {
    const page = await sanityClient.fetch(
      groq`*[_type == "page" && slug.current == $slug][0] {
        _id,
        title,
        content,
        author -> {
          name
        },
        slug,
        "imageUrl": image.asset->url,
        image {
          alt,
          asset->{
            _id,
            url
          }
        }
      }`,
      { slug }
    );
    return page || null; // Return null if page is undefined
  } catch (error) {
    console.error('Error fetching page:', error);
    throw error;
  }
}
