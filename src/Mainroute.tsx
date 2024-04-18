import { Route, Routes, useNavigate } from "react-router-dom";
import { LoginPageView } from "./views/LoginPageView";
import { DashboardView } from "./views/DashboardView";
import { AboutView } from "./views/AboutView";
import { GalleryView } from "./views/GalleryView";
import { DigitalProfileView } from "./views/DigitalProfileView";
import { PageNotFoundView } from "./views/PageNotFoundView";
import { SettingsComponent } from "./views/SettingsComponentView";
import { AddMembersComponent } from "./components/settings-components/AddMembersComponent";
import { AccountComponentDetailsView } from "./views/AccountComponentDetailsView";
import { Authorisation } from "./auth-service/auth";
import { useEffect } from "react";

export const Mainroute = () => {
  const isLoggedIn = Authorisation(); // Check if user is logged in with token
  const navigate = useNavigate();

  //protecting every route with the exception of public routes
  useEffect(() => {
    if (
      !isLoggedIn &&
      window.location.pathname !== "/about" &&
      window.location.pathname !== "/gallery"
    ) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <Routes>
        {/* Login route */}
        <Route path="/" element={<LoginPageView />} />

        {/* Public routes */}
        <Route path="/about" element={<AboutView />} />
        <Route path="/gallery" element={<GalleryView />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/settings" element={<SettingsComponent />} />
        <Route path="/addmember" element={<AddMembersComponent />} />
        <Route path="/profile/:id" element={<DigitalProfileView />} />
        <Route path="/accountdetails" element={<AccountComponentDetailsView />} />

        {/* Catch-all route for non-matching paths */}
        <Route path="*" element={<PageNotFoundView />} />
      </Routes>
    </div>
  );
};
