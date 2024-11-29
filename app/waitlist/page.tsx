
import Navbar from "./components/Navbar";
import Waitlist from "./components/waitlist";
import "./page.css"


export default function Home() {
  return (
    <div className=" page px-[0.5em] lg:px-[70px] py-[2em] md:py-[50px] w-full md:min-h-screen h-full overflow-hidden relative ">
      <Navbar />
      <Waitlist/>
    </div>
  );
}
