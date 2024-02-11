import { Route, Routes } from "react-router-dom";
import { LoginPageView } from "./views/LoginPageView";
import { DashboardView } from "./views/DashboardView";
import { AboutView } from "./views/AboutView";
import { GalleryView } from "./views/GalleryView";

export const Mainroute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPageView />} />
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/gallery" element={<GalleryView />} />
      </Routes>
    </div>
  );
};
