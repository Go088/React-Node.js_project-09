import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import { NeedHelpModal } from "../NeedHelp/NeedHelpModal/NeedHelpModal";

const WelcomePage = lazy(() => import("../../pages/WelcomePage/WelcomePage"));
const AuthPage = lazy(() => import("../../pages/AuthPage/AuthPage"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));

const App = () => {
  useEffect(() => {
    console.log("App component rendered");
  }, []);

  return (
    <Layout>
      <NeedHelpModal />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/auth/:id" element={<AuthPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
