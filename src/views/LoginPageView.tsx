import { useEffect, useRef, useState } from "react";
import { HeaderComponent } from "../components/header/HeaderComponent";
import { BackgroundDialogue } from "../components/reusables/BackgroundDialogue";
import { CarouselComp } from "../components/reusables/CarouselComp";
import { FooterComponent } from "../components/footer/FooterComponent";
import { useLocation } from "react-router-dom";
import { Avatar } from "../components/reusables/Avatar";
import { LoginForm } from "../components/non-reusables/LoginForm";
import { ResetForm } from "../components/non-reusables/ResetForm";

export const LoginPageView = () => {
  const [_LoginDialogue, setLoginDialogue] = useState<string>("");
  const [imageIdx, setImageIdx] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [forgotPass, setForgotPass] = useState<boolean>(false);
  const footerRef = useRef<HTMLDivElement>(null);

  const router = useLocation();

  const handlechangeLogout = (_e: React.MouseEvent<HTMLDivElement>) => {
    setLoginDialogue(_e.currentTarget.id);
    console.log(_e.currentTarget.id);
  };

  const imageObject = [
    { id: 1, image: "/carousel/caro1.jpg" },
    { id: 2, image: "/carousel/caro2.jpg" },
    { id: 3, image: "/carousel/caro3.jpg" },
    { id: 4, image: "/carousel/caro4.jpg" },
    { id: 5, image: "/carousel/caro5.jpg" },
  ];

  const updateImageIndex = () => {
    setImageIdx((prevIdx) => (prevIdx + 1) % imageObject.length);
  };

  useEffect(() => {
    const intervalId = setInterval(updateImageIndex, 5000);

    return () => clearInterval(intervalId);
  }, [imageIdx]);

  const handleCarousel = (event: React.MouseEvent<HTMLDivElement>) => {
    setImageIdx(Number(event.currentTarget.id));
  };

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

  //this handle the contact page button
  useEffect(() => {
    if (router.hash === "#contact" && footerRef.current) {
      footerRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [router.hash]);

  const Closedialog = () => {
    setLoginDialogue("");
    
  };

  const handleforgotpassword = ()=>{
    setForgotPass(!forgotPass);
  }

  return (
    <>
      <div className="w-full">
        <HeaderComponent
          logo="/images/Ekissi2.PNG"
          label="Ekissi Family Leanage"
          navlist={["Home", "About", "Gallery", "Contact"]}
          loginoutlabel={false}
          handlechangeLogout={handlechangeLogout}  
        />

        <BackgroundDialogue
          status={_LoginDialogue === "login" ? true : false}
          backgroundColor="bg-black"
        >
          {!forgotPass ? (
            <LoginForm
              onClick={Closedialog}
              onForgotpass={handleforgotpassword}
            />
          ) : (
            <ResetForm
              onClickcancel={handleforgotpassword}
              onClickclose={Closedialog}
            />
          )}
        </BackgroundDialogue>
      </div>

      {!isMobile ? (
        <div className="w-full">
          <div className="container mx-auto">
            <div className="mt-20  flex">
              <div className="w-1/2 h-[460px] p-2 flex justify-center items-center">
                <div className="w-3/4">
                  <h2 className="font-semibold text-3xl">
                    Ekissi Family Leanage
                  </h2>
                  <p className="mt-4 text-gray-500">
                    Family, where life begins and love never ends. Cherish every
                    moment, celebrate every milestone, and embrace the journey
                    together. Our roots may be different, but our family tree is
                    forever growing. Welcome to our space of love, laughter, and
                    endless memories
                  </p>
                  <div
                    className="
                    w-[140px] rounded-tl-[8rem] rounded-br-[8rem] 
                    text-center p-2 bg-[#37806B] text-white cursor-pointer 
                    text-white mt-4 hover:bg-opacity-50"
                    onClick={() => {
                      if (footerRef.current) {
                        footerRef.current.scrollIntoView({
                          behavior: "smooth",
                        });
                      }
                    }}
                  >
                    CONTACT
                  </div>
                </div>
              </div>

              <div className="w-1/2 h-[460px] p-2">
                <div className="w-full h-full border rounded-tl-[8rem] rounded-br-[8rem]">
                  <div
                    className="w-full h-full rounded-tl-[8rem] rounded-br-[8rem] relative 
                      -top-5 right-5 object-contain overflow-hidden"
                  >
                    {imageObject.map((obj, idx) => (
                      <img
                        key={obj.id}
                        src={obj.image}
                        alt={`carousel-${idx}`}
                        className="w-full h-full rounded-tl-[8rem] rounded-br-[8rem]"
                        style={{
                          position: "absolute",
                          right: `${100 * ((idx - imageIdx + imageObject.length) % imageObject.length)}%`,
                          transition: "right 0.9s ease-out",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full p-10">
            <CarouselComp imgIdx={imageIdx} handleClick={handleCarousel} />
          </div>

          <div className="container mx-auto px-20">
            <div className="flex mt-10">
              <div className="w-1/2 h-[460px] flex justify-center items-center">
                <div className="w-[60%] h-full border rounded-tl-[8rem] rounded-br-[8rem]">
                  <div
                    className="w-full h-full rounded-tl-[8rem] rounded-br-[8rem] relative 
                      -top-5 right-5 object-contain overflow-hidden"
                  >
                    <img
                      src={"/images/auntFlo.jpg"}
                      alt={"austinimage"}
                      className="w-full h-full rounded-tl-[8rem] rounded-br-[8rem]"
                    />
                  </div>
                </div>
              </div>

              <div className="w-1/2 h-[460px] p-2 flex justify-center items-center">
                <div className="w-3/4">
                  <h2 className="font-semibold text-3xl">
                    Message from Florence Austin
                  </h2>
                  <p className="mt-4 text-gray-500">
                    Welcome to our family's digital home, a place where stories
                    are woven, memories cherished, and bonds strengthened. Just
                    as the roots of a family tree anchor generations, this
                    website aims to be a digital sanctuary for our shared
                    experiences.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-20 flex">
              <div className="w-1/2 h-[460px] p-2 flex justify-center items-center">
                <div className="w-3/4">
                  <h2 className="font-semibold text-3xl">
                    Message from Josephine Quiacoe
                  </h2>
                  <p className="mt-4 text-gray-500">
                    Explore the 'About' section to journey through the
                    chronicles of our family's past, discovering the triumphs,
                    challenges, and laughter that have shaped us. 'Family
                    Moments' captures the essence of our present, a gallery of
                    shared celebrations, vacations, and day-to-day joys.
                  </p>
                </div>
              </div>

              <div className="w-1/2 h-[460px] flex justify-center items-center ">
                <div className="w-[60%] h-full border rounded-tl-[8rem] rounded-br-[8rem]">
                  <div
                    className="w-full h-full rounded-tl-[8rem] rounded-br-[8rem] relative 
                      -top-5 right-5 object-contain overflow-hidden"
                  >
                    <img
                      src={"/images/IMG-20210808-WA0010.jpg"}
                      alt={"auntjoe"}
                      className="w-full h-full rounded-tl-[8rem] rounded-br-[8rem]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20  flex">
              <div className="w-1/2 h-[460px] flex justify-center items-center">
                <div className="w-[60%] h-full border rounded-tl-[8rem] rounded-br-[8rem]">
                  <div
                    className="w-full h-full rounded-tl-[8rem] rounded-br-[8rem] relative 
                      -top-5 right-5 object-contain overflow-hidden"
                  >
                    <img
                      src={"/images/james2.jpg"}
                      alt={"jamesiamge"}
                      className="w-full h-full rounded-tl-[8rem] rounded-br-[8rem]"
                    />
                  </div>
                </div>
              </div>

              <div className="w-1/2 h-[460px] p-2 flex justify-center items-center">
                <div className="w-3/4">
                  <h2 className="font-semibold text-3xl">
                    Message from James Quaicoe
                  </h2>
                  <p className="mt-4 text-gray-500">
                    In 'Generations,' pay homage to our elders, the pillars of
                    wisdom and the keepers of traditions. Their tales, lessons,
                    and photographs paint a vivid portrait of our heritage. The
                    'Family Tree' unfolds the branches of our kinship,
                    connecting relatives across time and distance.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-20 flex">
              <div className="w-1/2 h-[460px] p-2 flex justify-center items-center">
                <div className="w-3/4">
                  <h2 className="font-semibold text-3xl">
                    Message from Ruth Aboah
                  </h2>
                  <p className="mt-4 text-gray-500">
                    Our values are the heartbeat of our family, and 'Family
                    Values' is a space to articulate and celebrate the
                    principles that bind us together. 'Recipes from Grandma's
                    Kitchen' invites you to savor the flavors that have been
                    passed down through the ages, bridging generations with the
                    magic of shared meals.
                  </p>
                </div>
              </div>

              <div className="w-1/2 h-[460px] flex justify-center items-center ">
                <div className="w-[60%] h-full border rounded-tl-[8rem] rounded-br-[8rem]">
                  <div
                    className="w-full h-full rounded-tl-[8rem] rounded-br-[8rem] relative 
                      -top-5 right-5 object-contain overflow-hidden"
                  >
                    <img
                      src={"/images/Rurh.jpg"}
                      alt={"auntruth"}
                      className="w-full h-full rounded-tl-[8rem] rounded-br-[8rem]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className="flex p-10">
            <div
              className="
             border w-[115px] h-[115px] 
             rounded-full shadow-lg flex 
             justify-center items-center
             relative -top-8 p-2 border-cyan-500
             "
            >
              <Avatar
                logo={"/images/Ekissi2.PNG"}
                width={"100"}
                height={"100"}
              />
            </div>
            <div className="ml-3">
              <h2 className="font-semibold text-3xl">Ekissi Family Leanage</h2>
              <p className="mt-4 text-gray-500">
                Family, where life begins and love never ends. Cherish every
                moment, celebrate every milestone, and embrace the journey
                together. Our roots may be different, but our family tree is
                forever growing. Welcome to our space of love, laughter, and
                endless memories
              </p>
            </div>
          </div>

          <div className="flex p-10">
            <div
              className="
             border w-[115px] h-[115px] 
             rounded-full shadow-lg flex 
             justify-center items-center
             relative -top-8 p-2 border-cyan-500
             "
            >
              <Avatar
                logo={"/images/auntFlo.jpg"}
                width={"100"}
                height={"100"}
              />
            </div>
            <div className="ml-3">
              <h2 className="font-semibold text-3xl">
                Message from Florence Austin
              </h2>
              <p className="mt-4 text-gray-500">
                Welcome to our family's digital home, a place where stories are
                woven, memories cherished, and bonds strengthened. Just as the
                roots of a family tree anchor generations, this website aims to
                be a digital sanctuary for our shared experiences.
              </p>
            </div>
          </div>

          <div className="flex p-10">
            <div
              className="
              border w-[115px] h-[115px] 
             rounded-full shadow-lg flex 
             justify-center items-center
             relative -top-8 p-2 border-cyan-500
             "
            >
              <Avatar
                logo={"/images/IMG-20210808-WA0010.jpg"}
                width={"100"}
                height={"100"}
              />
            </div>
            <div className="ml-3">
              <h2 className="font-semibold text-3xl">
                Message from Josephine Quiacoe
              </h2>
              <p className="mt-4 text-gray-500">
                Explore the 'About' section to journey through the chronicles of
                our family's past, discovering the triumphs, challenges, and
                laughter that have shaped us. 'Family Moments' captures the
                essence of our present, a gallery of shared celebrations,
                vacations, and day-to-day joys.
              </p>
            </div>
          </div>

          <div className="flex p-10">
            <div
              className="
              border w-[115px] h-[115px] 
             rounded-full shadow-lg flex 
             justify-center items-center
             relative -top-8 p-2 border-cyan-500
             "
            >
              <Avatar
                logo={"/images/james2.jpg"}
                width={"100"}
                height={"100"}
              />
            </div>
            <div className="ml-3">
              <h2 className="font-semibold text-3xl">
                Message from James Quaicoe
              </h2>
              <p className="mt-4 text-gray-500">
                In 'Generations,' pay homage to our elders, the pillars of
                wisdom and the keepers of traditions. Their tales, lessons, and
                photographs paint a vivid portrait of our heritage. The 'Family
                Tree' unfolds the branches of our kinship, connecting relatives
                across time and distance.
              </p>
            </div>
          </div>

          <div className="flex p-10">
            <div
              className="
              border w-[115px] h-[115px] 
             rounded-full shadow-lg flex 
             justify-center items-center
             relative -top-8 p-2 border-cyan-500
             "
            >
              <Avatar logo={"/images/Rurh.jpg"} width={"100"} height={"100"} />
            </div>
            <div className="ml-3">
              <h2 className="font-semibold text-3xl">
                Message from Ruth Aboah
              </h2>
              <p className="mt-4 text-gray-500">
                Our values are the heartbeat of our family, and 'Family Values'
                is a space to articulate and celebrate the principles that bind
                us together. 'Recipes from Grandma's Kitchen' invites you to
                savor the flavors that have been passed down through the ages,
                bridging generations with the magic of shared meals.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="w-full" ref={footerRef}>
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
    </>
  );
};
