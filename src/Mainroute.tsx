import { Route, Routes } from "react-router-dom";
import { LoginPageView } from "./views/LoginPageView";
import { DashboardView } from "./views/DashboardView";
import { AboutView } from "./views/AboutView";
import { GalleryView } from "./views/GalleryView";
import { DigitalProfileView } from "./views/DigitalProfileView";
import { PageNotFoundView } from "./views/PageNotFoundView";
import { SettingsComponent } from "./views/SettingsComponentView";
import { AddMembersComponent } from "./components/settings-components/AddMembersComponent";

export const Mainroute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPageView />} />
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/settings" element={<SettingsComponent />} />
        <Route path="/addmember" element={<AddMembersComponent />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/gallery" element={<GalleryView />} />
        <Route path="/profile/:id" element={<DigitalProfileView />} />
        <Route path="*" element={<PageNotFoundView />} />
      </Routes>
    </div>
  );
};
