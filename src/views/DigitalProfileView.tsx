import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Decrypt } from "../components/helperfunctions/functions";

export const DigitalProfileView = () => {

  let params = useParams();

  useEffect(() => {
    params.id && console.log(Decrypt(params.id));
  });

  return <div className="w-full h-screen">DigitalProfileView</div>;
};
