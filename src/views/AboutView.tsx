import { HeaderComponent } from "../components/header/HeaderComponent"

export const AboutView = () => {
    const images = [
      { logo: "", initials: "L G" },
      { logo: "images/searchIcon.svg", initials: "L G" },
      { logo: "", initials: "L G" },
      { logo: "images/searchIcon.svg", initials: "L G" },
    ];

  return (
    <div className="w-full h-screen">
      <HeaderComponent
        logo="/images/logo.svg"
        label="Ekissi Family Leanage"
        navlist={["Home", "About", "Gallery"]}
        loginoutlabel={false}
        loggedUserId="1"
        avatarArray={images}
      />
      
    </div>
  );
}
