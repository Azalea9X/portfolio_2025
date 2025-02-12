'use client'

import { useRouter } from 'next/navigation'

const Nav = () =>  {
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
    <button type="button" onClick={handleRouterAbout}>
      About
    </button>


</>
  )
}

export default Nav; 