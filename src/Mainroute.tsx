import { Route, Routes } from "react-router-dom";
import { LoginPageView } from "./views/LoginPageView";


export const Mainroute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPageView />}/>
      </Routes>
    </div>
  );
};
