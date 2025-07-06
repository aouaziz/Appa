import About from "./components/About";
import Contact from "./components/Contact";
import Location from "./components/Location";
import Programs from "./components/Programs";
import Hero from "./components/Hero";
import Stats from "./components/stats";

export default function Home() {
  return (
   <main>
    <Hero/>
    <About/>
    <Stats/>
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
