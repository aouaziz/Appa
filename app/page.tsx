import About from "./components/About";
import Banner from "./components/Banner";
import Contact from "./components/Contact";
import Location from "./components/Location";
import Programs from "./components/Programs";

export default function Home() {
  return (
   <main>
    <Banner/>
    <About/>
    <Programs/>
    <div className="relative">
      <Location />
      <div className="relative z-10 -mt-60">
        <Contact />
      </div>
    </div>

   </main>
  );
}
