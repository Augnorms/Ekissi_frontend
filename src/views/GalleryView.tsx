import { FooterComponent } from "../components/footer/FooterComponent";
import { HeaderComponent } from "../components/header/HeaderComponent";

export const GalleryView = () => {



  return (
    <div className="w-full h-screen">
      <HeaderComponent
        logo="/images/Ekissi2.PNG"
        label="Ekissi Family Leanage"
        navlist={["Home", "About", "Gallery"]}
        loginoutlabel={false}
      />

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
