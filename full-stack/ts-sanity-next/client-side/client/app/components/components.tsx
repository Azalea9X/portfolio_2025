import React from 'react'; 
const components:any = {
    block: {
      h1: ({ children }: { children: React.ReactNode }) => (
        <h1 className="text-3xl font-extrabold">{children}</h1>
      ),
      h2: ({ children }: { children: React.ReactNode }) => (
        <h2 className="text-2xl font-extrabold">{children}</h2>
      ),
      h3: ({ children }: { children: React.ReactNode }) => (
        <h3 className="text-xl font-extrabold">{children}</h3>
      ),
      h4: ({ children }: { children: React.ReactNode }) => (
        <h4 className="text-lg font-extrabold">{children}</h4>
      ),
      normal: ({ children }: { children: React.ReactNode }) => (
        <p className="text-lg leading-relaxed leading-[2]">{children}</p>
      ),
      blockquote: ({ children }: { children: React.ReactNode }) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic">{children}</blockquote>
      ),
      // Add more block types as needed (list, listItem, etc.)
    },
    marks: {
      strong: ({ children }: { children: React.ReactNode }) => (
        <strong className="font-semibold">{children}</strong>
      ),
      em: ({ children }: { children: React.ReactNode }) => (
        <em className="italic">{children}</em>
      ),
      code: ({ children }: { children: React.ReactNode }) => (
        <code className="bg-gray-100 p-1 rounded font-mono text-sm">{children}</code>
      ),
      // Add more mark types as needed
    },
    types: {
      image: ({ value }: { value: any }) => {
        if (!value?.asset?.url) {
          return null;
        }
        return (
          <img
            src={value.asset.url}
            alt={value.alt || 'Image'}
            className="rounded-lg max-w-full"
          />
        );
      },
      // Add more custom types as needed
    },
    list: {
      bullet: ({ children }: { children: React.ReactNode }) => (
        <ul className="list-disc list-inside">{children}</ul>
      ),
      number: ({ children }: { children: React.ReactNode }) => (
        <ol className="list-decimal list-inside">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }: { children: React.ReactNode }) => (
        <li>{children}</li>
      ),
      number: ({ children }: { children: React.ReactNode }) => (
        <li>{children}</li>
      ),
    }
  };
  export default components;