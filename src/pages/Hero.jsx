import { Highlight, HeroHighlight } from "../components/ui/hero-highlight";
import { LampContainer } from "../components/ui/lamp";

export default function Hero(){


  return(
    <div className="dark:text-gray-50 text-neutral-800  ">
        
        <HeroHighlight className={"lg:text-5xl md:text-4xl text-2xl font-bold text-center max-w-3xl"}>
          <div className="md:mb-8 mb-2 ">Simplify Your Workflow</div> 
            <Highlight className={""}>
              Achieve More with Taskify
            </Highlight>
        </HeroHighlight>

        
    </div>
  )
}