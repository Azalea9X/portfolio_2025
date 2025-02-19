'use client'

import { useRouter } from 'next/navigation'

const Nav = () =>  {
alert(window.innerWidth);
  /*<button className="d-none" type="button" onClick={handleDashboardClick}>
About
</button>

<button  className="d-none"  type="button" onClick={handleDashboardClick}>
About
</button>

<button  className="d-none" type="button" onClick={handleDashboardClick}>
About
</button>*/

  const router = useRouter()

  const handleRouterAbout = () => {
    router.push('/about')
  }

  return (<>
<nav className="font-extrabold relative 
md:top-[-6.25rem]
lg:top-[-260px] xl:top-[-260px] left-[8%] text-white bg-black flex justify-left
2xl:left-[5.6rem]
">
  <button 
    className="text-2xl py-4 px-8 rounded-lg hover:bg-gray-700 transition duration-300"
    type="button" 
    onClick={handleRouterAbout}
    aria-label="Navigate to About page"
  >
    About
  </button>
  <button 
    className="text-2xl py-4 px-8 rounded-lg hover:bg-gray-700 transition duration-300 ml-4"
    type="button" 
    onClick={() => router.push('/contact')}
    aria-label="Navigate to Contact page"
  >
    Contact
  </button>
</nav>
</>
  )
}

export default Nav; 