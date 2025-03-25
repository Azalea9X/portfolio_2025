'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { getPages } from "@/app/components/schemaTypes/sanity-utils";  // Keep using getPages to populate the menu

const Nav = () => {
  const router = useRouter();
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      setIsLoading(true);
      try {
        const pagesData:any = await getPages(); //Fetch all the pages
        setPages(pagesData);
      } catch (error) {
        console.error("Error fetching pages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPages();
  }, []);

  const handleNavigation = (slug: string) => {
    router.push(`/pages/${slug}`);  // Navigate to the dynamic route
  };

  if (isLoading) {
    return <div>Loading navigation...</div>;
  }

  return (
    <nav className="font-extrabold relative bg-black d-flex justify-content-between text-white
      xs:top-[-5.25rem] left-[-1.35rem] my-[6rem] max-w-[120%] min-w-[110%]
      sm:left-[-2rem]
      md:justify-content-center top-[5.5rem]
      lg:justify-content-center min-w-[120%]
      xl:justify-content-between
      2xl:justify-content-around
      ">
      {pages.map((page: any) => (
        <button
          key={page._id}
          className="text-2xl py-4 px-8 rounded-lg hover:bg-gray-700 transition duration-300"
          type="button"
          onClick={() => handleNavigation(page.slug.current)}
          aria-label={`Navigate to ${page.title} page`}
        >
          {page.title}
        </button>
      ))}
    </nav>
  );
};

export default Nav;