import { Highlight, HeroHighlight } from "../components/ui/hero-highlight";
import { LampContainer } from "../components/ui/lamp";

export default function Hero(){

  function Heading(){
    return (
      <div className="text-gray-100">
        Taskify app that makes you a productivity master
      </div>
    )
  }
  return(
    <div className="dark:text-gray-200 text-neutral-800 ">
        
        <HeroHighlight className={"text-6xl font-bold text-center mx-20 max-w-7xl"}>
          <div className="mb-10">Achieve More with Less Stress. Your</div> 
            <Highlight>
              Task Management Solution!
            </Highlight>
        </HeroHighlight>

        
    </div>
  )
}