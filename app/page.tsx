import About from "./components/About";
import Banner from "./components/Banner";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Location from "./components/Location";
import Programs from "./components/Programs";

export default function Home() {
  return (
   <main>
    <Banner/>
    <About/>
    <Programs/>
    <Location/>
    <Contact/>
    <Footer/>
   </main>
  );
}
