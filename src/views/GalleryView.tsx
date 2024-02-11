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
    </div>
  );
};
