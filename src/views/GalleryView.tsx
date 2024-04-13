import { useEffect, useState } from "react";
import { FooterComponent } from "../components/footer/FooterComponent";
import { HeaderComponent } from "../components/header/HeaderComponent";
import Button from "../components/reusables/formcomponent/Button";
import { CloseDiagComp } from "../components/reusables/CloseDiagComp";
import { SkeleletalLoaderGallery } from "../components/reusables/SkeleletalLoaderGallery";
import axios from "axios";

type GalleryItem = {
  id: number;
  filename: string;
  fileurl: string;
  fileoriginalname: string;
  resourcetype: string;
};

export const GalleryView = () => {
  const [_isMobile, setIsMobile] = useState<boolean>(false);
  const [searchvalue, setSearchvalue] = useState<string>("");
  const [imgvidset, setImgvidset] = useState<string>(
    localStorage.getItem("media") || "",
  );
  const [checkfileId, setCheckfileId] = useState<number>(0);
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [videos, setVidios] = useState<GalleryItem[]>([]);

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

  const [mouseControl, setMouseControl] = useState<boolean>(false);

  const handleMouseEnter = (id: number) => {
    setMouseControl(true);
    setCheckfileId(id);
  };

  const handleMouseLeave = () => {
    setMouseControl(false);
    setCheckfileId(0);
  };

  const [expandImage, setExpandImage] = useState<string>("");
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [checkResourceType, setCheckRespourceType] = useState<string>("");

  const handlExpandImage = (param: string, type: string) => {
    setExpandImage(param);
    setCheckRespourceType(type);
    setIsExpand(true);
  };
  const handleCloseExpand = () => {
    setIsExpand(false);
  };

  const handlesetvideoOrimage = (param: string) => {
    setImgvidset(param);
    localStorage.setItem("media", param);
  };

  const handleFetchgallery = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_GET_ALL_GALLERY);

      if (response) {
        let filterImages = response?.data?.data?.filter(
          (data: GalleryItem) => data.resourcetype === "image",
        );
        let filterVideos = response?.data?.data?.filter(
          (data: GalleryItem) => data.resourcetype === "video",
        );
        setImages(filterImages);
        setVidios(filterVideos);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleFetchgallery();
  }, []);

  //search function down here...
  const handlesearchimages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchvalue(value);
  };

  const handlesearchvideos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchvalue(value);
  };

  //for images
  useEffect(() => {
    let filtersearch = images.filter((filtres) => {
      return (
        filtres.filename.toLocaleLowerCase().slice(0, searchvalue.length) ===
        searchvalue.toLocaleLowerCase()
      );
    });

    if (searchvalue.length > 0 && filtersearch.length > 0) {
      setImages(filtersearch);
    } else if (searchvalue.length > 0 && filtersearch.length === 0) {
      setImages([]);
    } else {
      handleFetchgallery();
    }
  }, [searchvalue]);

  //for vedios
  useEffect(() => {
     let filtersearch = videos.filter((filtres) => {
       return (
         filtres.filename.toLocaleLowerCase().slice(0, searchvalue.length) ===
         searchvalue.toLocaleLowerCase()
       );
     });

    if (searchvalue.length > 0 && filtersearch.length > 0) {
      setVidios(filtersearch);
    } else if (searchvalue.length > 0 && filtersearch.length === 0) {
      setVidios([]);
    }else{
       handleFetchgallery();
    }
  }, [searchvalue]);

  return (
    <div className="w-full h-screen">
      <HeaderComponent
        logo="/images/Ekissi2.PNG"
        label="Ekissi Family Leanage"
        navlist={["Home", "About", "Gallery"]}
        loginoutlabel={false}
        handleSearchResult={
          imgvidset === "images"
            ? handlesearchimages
            : imgvidset === "videos"
              ? handlesearchvideos
              : handlesearchimages
        }
        searchValue={searchvalue}
      />

      <>
        <div className="w-full h-[100vh] overflow-auto">
          <div className="w-full shadow-md p-2 flex gap-2">
            <Button
              buttonLabel="images"
              className="w-fit p-2 mt-1 
                     rounded text-white bg-cyan-800
                     hover:bg-cyan-500 hover:scale-[1.2]
                     "
              buttonStyle={{
                backgroundColor: imgvidset === "images" ? "dodgerblue" : "",
              }}
              onClick={() => handlesetvideoOrimage("images")}
            />

            <Button
              buttonLabel="videos"
              className="w-fit p-2 mt-1 
                     rounded text-white bg-cyan-700
                     hover:bg-cyan-500 hover:scale-[1.2]
                     "
              buttonStyle={{
                backgroundColor: imgvidset === "videos" ? "dodgerblue" : "",
              }}
              onClick={() => handlesetvideoOrimage("videos")}
            />
          </div>

          <>
            {imgvidset === "images" ? (
              <div className="w-full h-[95vh] bg-slate-100 mt-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 grid-rows-3 p-2">
                {images.length > 0
                  ? images.map((image, index) => (
                      <div
                        key={index}
                        className="w-full h-[100%] bg-white shadow-xl rounded relative cursor-pointer object-contain"
                        onMouseEnter={() => handleMouseEnter(image.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <img
                          src={image.fileurl} // Assuming image object has a 'fileurl' property
                          className="w-full h-full rounded"
                          alt="gallery-image"
                        />
                        {mouseControl && checkfileId === image.id && (
                          <div
                            className="w-full h-[100%] absolute top-0 z-[5] rounded flex justify-center items-center bg-black opacity-50 text-white cursor-pointer"
                            onClick={() =>
                              handlExpandImage(
                                image.fileurl,
                                image.resourcetype,
                              )
                            }
                          >
                            {image.filename}{" "}
                            {/* Display filename or any other text */}
                          </div>
                        )}
                        <div className="w-full rounded p-2 text-center shadow-lg bg-white">
                          {image.filename}
                        </div>
                      </div>
                    ))
                  : [...new Array(18)].map((_data, idx) => (
                      <SkeleletalLoaderGallery key={idx} />
                    ))}
              </div>
            ) : imgvidset === "videos" ? (
              <div
                className="w-full h-[95vh] bg-slate-100 mt-2 grid sm:grid-cols-1 md:grid-cols-2 
                lg:grid-cols-6 gap-2 grid-rows-3 p-2"
              >
                {videos.length > 0
                  ? videos.map((video, index) => (
                      <div
                        key={index}
                        className="w-full h-[100%] bg-white shadow-xl rounded relative cursor-pointer object-contain"
                        onMouseEnter={() => handleMouseEnter(video.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <video
                          src={video.fileurl} // Assuming video object has a 'fileurl' property
                          className="w-full h-full rounded"
                          title="gallery-video"
                          controls // Add controls for video playback
                        />
                        {mouseControl && checkfileId === video.id && (
                          <div
                            className="w-full h-[100%] absolute top-0 z-[5] rounded flex justify-center items-center bg-black opacity-50 text-white cursor-pointer"
                            onClick={() =>
                              handlExpandImage(
                                video.fileurl,
                                video.resourcetype,
                              )
                            }
                          >
                            {video.filename}{" "}
                            {/* Display filename or any other text */}
                          </div>
                        )}
                        <div className="w-full rounded p-2 text-center shadow-lg bg-white">
                          {video.filename}
                        </div>
                      </div>
                    ))
                  : [...new Array(18)].map((_data, idx) => (
                      <SkeleletalLoaderGallery key={idx} />
                    ))}
              </div>
            ) : (
              <></>
            )}
          </>

          {isExpand && (
            <div className="w-full h-[100vh] fixed top-0 bg-opacity-75 z-[12] flex justify-center items-center">
              <div className="w-[40%] h-[70vh]">
                <div className="w-full flex justify-end p-1 bg-slate-100">
                  <CloseDiagComp onClick={handleCloseExpand} />
                </div>
                <div className="w-full h-[61vh] bg-white object-contain">
                  {checkResourceType === "image" ? (
                    <img
                      src={expandImage}
                      alt="gallery expanded-img"
                      className="w-full h-full rounded"
                    />
                  ) : checkResourceType === "video" ? (
                    <video
                      src={expandImage}
                      className="w-full h-full rounded"
                      title="gallery-video"
                      controls
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </>

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
