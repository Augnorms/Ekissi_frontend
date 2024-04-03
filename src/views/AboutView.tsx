import { useEffect, useState } from "react";
import { FooterComponent } from "../components/footer/FooterComponent";
import { HeaderComponent } from "../components/header/HeaderComponent";
import Button from "../components/reusables/formcomponent/Button";
import { CloseDiagComp } from "../components/reusables/CloseDiagComp";
import axios from "axios";
import { AboutPageSkeletalLoader } from "../components/reusables/AboutPageSkeletalLoader";
import React from "react";

export const AboutView = () => {
  const [_isMobile, setIsMobile] = useState<boolean>(false);
  const [padding, setPaddding] = useState<number>(40);
  const [width, setWidth] = useState<number>(80);
  const [maxormin, setMaxormin] = useState<boolean>(false);
  const [more, setMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aboutcontent, setAboutcontent] = useState<string>("");
  const [aboutArray, setAboutArray] = useState<string[]>([]);

  const images = [
    { logo: "", initials: "F A" },
    { logo: "", initials: "J Q" },
    { logo: "", initials: "J Q" },
    { logo: "", initials: "R A" },
  ];

  useEffect(() => {
    if (aboutcontent.length > 475) {
      // Checking against 475
      let startIndex = 0;
      const chunks: string[] = [];

      while (startIndex < aboutcontent.length) {
        chunks.push(aboutcontent.slice(startIndex, startIndex + 475)); // Slicing based on condition
        startIndex += 475; // Incrementing startIndex
      }

      setAboutArray(chunks);
    } else {
      // If length is less than or equal to 475, no need to slice, just set the content directly
      setAboutArray([aboutcontent]);
    }
  }, [aboutcontent]);

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

  const handleLearnmore = () => {
    setMore(!more);
  };

  const handlemaxmin = () => {
    setMaxormin(!maxormin);
  };

  useEffect(() => {
    if (maxormin === true) {
      setPaddding(0);
      setWidth(100);
    } else {
      setPaddding(40);
      setWidth(80);
    }
  }, [padding, width, maxormin]);

  const handlefetchaboutcontent = async () => {
    try {
      setIsLoading(true);

      const respone = await axios.get(import.meta.env.VITE_GET_ABOUT_CONTENT);
      setAboutcontent(respone?.data?.data[0].history);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handlefetchaboutcontent();
  }, []);

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

      {!isLoading ? (
        <div className="w-full h-[100vh] overflow-auto relative">
          {
            /*background*/
            <div className="w-full h-[100vh] bg-slate-100 flex justify-center items-center">
              <div className="w-[40%] h-screen rounded bg-white"></div>
            </div>
            /*background*/
          }

          <div className=" w-full h-screen absolute top-0 z-[5]">
            <div className="w-full h-[45vh] flex">
              <div className="w-[50%] hidden lg:flex justify-center">
                <div
                  className="
                    w-[310px] h-[310px] shadow-lg
                    border-2 border-white
                    rounded-full bg-blue-200 xl:ml-28
                    flex justify-center items-center
                  "
                ></div>
              </div>

              <div className="lg:w-[50%] flex justify-center">
                <div
                  className="xl:w-[50%] rounded flex items-center 
                  justify-center p-5 pt-2 shadow-lg"
                >
                  <div>
                    <p className="font-bold text-center text-4xl mb-5 mt-3 lg:text-start underline">
                      About Our Family
                    </p>
                    <p className="text-sm text-center lg:text-start">
                      <span className="font-bold">Ekissi family</span> a
                      close-knit unit steeped in love and unity. With a rich
                      cultural heritage as their foundation, they embody
                      resilience and support. Gatherings are cherished, filled
                      with laughter and shared memories. Inclusive and
                      welcoming, they extend their embrace to friends and
                      community.
                    </p>

                    <Button
                      buttonLabel="Learn More"
                      className="w-fit p-2 mt-1 
                     rounded-full text-white bg-cyan-800
                     hover:bg-cyan-500 hover:scale-[1.2]
                     "
                      onClick={handleLearnmore}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-[45vh] flex justify-center p-10">
              <div className="lg:w-[70%] grid sm:grid-cols-1 lg:grid-cols-3 gap-2">
                <div className="p-8 shadow-lg hover:scale-[1.2] cursor-pointer bg-white">
                  <div className="font-bold text-xl mb-4">01</div>
                  <div>
                    <span className="font-bold">Ekissi family</span> a
                    close-knit unit steeped in love and unity. With a rich
                    cultural heritage as their foundation, they embody
                    resilience and support. Gatherings are cherished, filled
                    with laughter and shared memories. Inclusive and welcoming,
                    they extend their embrace to friends and community.
                  </div>
                </div>
                <div className="p-8 shadow-lg hover:scale-[1.2] cursor-pointer bg-blue-100 rounded">
                  <div className="font-bold text-xl mb-4">02</div>
                  <div>
                    <span className="font-bold">Ekissi family</span> a
                    close-knit unit steeped in love and unity. With a rich
                    cultural heritage as their foundation, they embody
                    resilience and support. Gatherings are cherished, filled
                    with laughter and shared memories. Inclusive and welcoming,
                    they extend their embrace to friends and community.
                  </div>
                </div>
                <div className="p-8 shadow-lg hover:scale-[1.2] cursor-pointer bg-white">
                  <div className="font-bold text-xl mb-4">03</div>
                  <div>
                    <span className="font-bold">Ekissi family</span> a
                    close-knit unit steeped in love and unity. With a rich
                    cultural heritage as their foundation, they embody
                    resilience and support. Gatherings are cherished, filled
                    with laughter and shared memories. Inclusive and welcoming,
                    they extend their embrace to friends and community.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AboutPageSkeletalLoader />
      )}

      {more && (
        <div
          className="w-full h-screen fixed top-0 z-[10] flex justify-center overflow-auto p-10"
          style={{
            padding: `${padding}px`,
          }}
        >
          <div
            className="h-[100%] bg-white"
            style={{
              width: `${width}%`,
            }}
          >
            <div className="w-full p-2 shadow-md flex justify-end gap-2">
              <img
                src="/images/maximize.svg"
                alt="maximise-image"
                className="-mt-3 cursor-pointer"
                onClick={handlemaxmin}
              />
              <CloseDiagComp onClick={handleLearnmore} />
            </div>

            <div className="h-[85vh] p-5 bg-slate-200 overflow-auto">
              {aboutArray.length > 0 &&
                aboutArray.map((arr, index) => (
                  <React.Fragment key={index}>
                    <p>{arr}</p>
                    {index !== aboutArray.length - 1 && <br />}{" "}
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>
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
