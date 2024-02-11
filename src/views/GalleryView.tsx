import { HeaderComponent } from "../components/header/HeaderComponent";

export const GalleryView = () => {



  return (
    <div className="w-full h-screen">
      <HeaderComponent
        logo="/images/logo.svg"
        label="Ekissi Family Leanage"
        navlist={["Home", "About", "Gallery"]}
        loginoutlabel={false}
      />
    </div>
  );
};
