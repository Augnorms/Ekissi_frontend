import { HeaderComponent } from "../components/header/HeaderComponent"

export const AboutView = () => {
    const images = [
      { logo: "", initials: "F A" },
      { logo: "", initials: "J Q" },
      { logo: "", initials: "J Q" },
      { logo: "", initials: "R A" },
    ];

  return (
    <div className="w-full h-screen">
      <HeaderComponent
        logo="/images/Ekissi2.PNG"
        label="Ekissi Family Leanage"
        navlist={["Home", "About", "Gallery"]}
        loginoutlabel={false}
        loggedUserId="1"
        avatarArray={images}
      />
    </div>
  );
}
