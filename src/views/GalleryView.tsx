import { useEffect, useState } from "react";
import { FooterComponent } from "../components/footer/FooterComponent";
import { HeaderComponent } from "../components/header/HeaderComponent";

export const GalleryView = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  //handling mobile screen here
  const handlescreen = () => {
    setIsMobile(window.innerWidth <= 900 && window.innerWidth >= 200);
  };

  useEffect(() => {
    window.addEventListener("resize", handlescreen);

    handlescreen();

    return () => {
      window.addEventListener("resize", handlescreen);
    };
  }, []);

  return (
    <div className="w-full h-screen">
      <HeaderComponent
        logo="/images/Ekissi2.PNG"
        label="Ekissi Family Leanage"
        navlist={["Home", "About", "Gallery"]}
        loginoutlabel={false}
      />

      {!isMobile ? (
        <div className="w-full h-[60vh] overflow-auto"></div>
      ) : (
        <div></div>
      )}

      <div className="w-full">
        <FooterComponent
          logo="/images/Ekissi2.PNG"
          arrayofmediaicons={[
            { logo: "/images/facebook.svg", initials: "F B" },
            { logo: "/images/tweet.svg", initials: "T T" },
            { logo: "/images/linkedin.svg", initials: "L N" },
            { logo: "/images/watsapp.svg", initials: "W P" },
          ]}
        />
      </div>
    </div>
  );
};
