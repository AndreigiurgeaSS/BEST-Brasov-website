import Hero from '../sections/Hero';
import WhatWeDo from '../sections/WhatWeDo';
import WhatIsBest from '../sections/WhatIsBest';
import CoreValues from '../sections/CoreValues';
import { useEffect } from "react"; 

const Home = () => {
  
  useEffect(() => {
    document.title = "Home | BEST Brașov";
  }, []);

  return (
    <main className="flex-grow w-full overflow-x-hidden">
      <Hero />
      <WhatWeDo />
      <WhatIsBest />
      <CoreValues />
    </main>
  );
};

export default Home;