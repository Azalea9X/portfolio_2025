import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './app/components/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'My own website',
  apiVersion: '2025-02-05',
  projectId: 'slqsfm7w',
  dataset: 'production',
  basePath: '/admin',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  // Add a studio name and a custom logo


})