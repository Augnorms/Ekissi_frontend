
export const SkeleletalLoaderGallery = () => {
  return (
    <div>
        <div
          className="w-full h-[100%] bg-white shadow-xl rounded relative cursor-pointer 
                 object-contain animate-pulse 
                "
        >
          {
            <div
              className="w-full h-[100%] absolute top-0 z-[5] rounded flex justify-center 
                    items-center bg-black opacity-50 text-white cursor-pointer animate-pulse "
            ></div>
          }
        </div>
      </div>
  );
}
