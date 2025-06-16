import SplitText from "@/Reactbits/SplitText/SplitText";
import Image from "next/image";
import ScrapeLinkForm from "./scrape-link-form";

const TitleInput = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 mt-20 bg-background-black">
      <SplitText
        text="Let's automate shopping!"
        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-center pb-5"
        delay={100}
        duration={0.4}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
      />
      <Image
        src="https://www.vectorlogo.zone/logos/amazon/amazon-tile.svg"
        alt="shopping"
        width={100}
        height={100}
      />
      <ScrapeLinkForm />
    </div>
  );
};

export default TitleInput;
