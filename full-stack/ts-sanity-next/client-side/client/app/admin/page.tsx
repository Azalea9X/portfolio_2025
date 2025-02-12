"use client"; 
import { NextStudio } from "next-sanity/studio";
import defineConfig from "./../../../client/sanity.config"; 

export default function AdminPage() {
  return <NextStudio config={defineConfig} />;
}