'use client'

import { useRouter } from 'next/navigation'

const Nav = () =>  {
//alert(window.innerWidth);
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
  <nav className="font-extrabold">
    <button type="button" onClick={handleRouterAbout}>
      About
    </button>
    </nav>

</>
  )
}

export default Nav; 