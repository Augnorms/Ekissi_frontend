
interface Props {
  loaderOne?: boolean;
  loaderTwo?: boolean;
  loaderThree?: boolean;
}

export const LoaderComponent = (props: Props) => {

  return (
    <>
      {props.loaderOne || props.loaderTwo || props.loaderThree ? (
        <div className="w-full h-screen fixed top-0 z-10">
          <>
            {props.loaderOne && (
              <div className="h-[100vh]">
                <div className="outer"></div>
                <div className="middle"></div>
                <div className="inner"></div>
              </div>
            )}

            {props.loaderTwo && (
              <div className="h-[100vh] flex justify-center items-center">
                <img
                  className="w-[200px] h-[200px]"
                  src="/images/1488.gif"
                  alt="loader-one"
                />
              </div>
            )}

            {props.loaderThree && (
              <div className="h-[100vh] flex justify-center items-center">
                <img
                  className="w-[200px] h-[200px]"
                  src="/images/1491.gif"
                  alt="loader-two"
                />
              </div>
            )}
          </>
        </div>
      ) : null}
    </>
  );
};
