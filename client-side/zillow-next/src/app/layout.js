
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar"; 
import Main from "./components/main";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Zillow clone",
  description: "A demo app",
};

/*Note- xs-375px
sm-640px
md-768px
lg-1024px
xl-1280px
2xl-1536px
3xl-1920px
4xl-2560px*/

const RootLayout = ({children}) => {
  return (
    <html>
      <body>
    <div className="root-layout">
      <header className="header padding-bottom-[10rem]">
      <Navbar />
            
        <h1 className="text-red-500 relative 
        sm:text-4xl left-[1rem] 
        md:text-5xl 
        md:left-[2rem] 
        lg:text-3xl text-center left-[-3rem] 
        xl:text-[5rem] top-[3rem] padding-top-[5rem]
        ">Zillow Clone</h1>
      </header>


      <Main />
      <footer className="footer padding-top-[5rem]">
        <p>&copy; {new Date().getFullYear()} Zillow Clone</p>
      </footer>
    </div>
   
    </body>
    </html>
  );
}

export default RootLayout;