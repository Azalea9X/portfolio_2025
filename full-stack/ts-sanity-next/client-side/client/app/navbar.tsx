'use client'
import {useEffect, useState} from "react"; 
import { useRouter } from 'next/navigation'
import { getPages } from "@/app/components/schemaTypes/sanity-utils";
const Nav = () => {
  const router = useRouter();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const pagesData:any = await getPages();
        setPages(pagesData);
      } catch (error) {
        console.error("Error fetching pages:", error);
        // Handle error appropriately, e.g., display an error message
      }
    };

    fetchPages();
  }, []);
//alert(window.innerWidth);
  // Function to navigate to a page based on its slug
  const handleNavigation = (slug:string) => {
    router.push(`/pages/${slug}`);
  };

  return (
    <>
    <nav className="font-extrabold relative bg-black d-flex justify-content-between text-white
      xs:top-[-5.25rem] left-[-1.35rem] my-[6rem] max-w-[120%] min-w-[110%]
      sm:left-[-2rem]
      md:justify-content-center top-[-1.5rem]
      lg:justify-content-center min-w-[120%]
      xl:justify-content-between
      2xl:justify-content-around
      ">
        {pages.map((page:any) => (
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
    </>
  );
};
export default Nav; 