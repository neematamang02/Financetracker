import React from "react";
import Layout from "./Layout/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import routesConfig from "./routes/routesConfig";
import Dashboardlayout from "./Layout/Dashboardlayout";
import DASH_ROUTES from "./routes/dashboardroutes";
import dashboardroutesconfig from "./routes/dashboardroutesconfig";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Routes>
          {routesConfig.map(({ path, Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
          <Route
            path={DASH_ROUTES.DashBoard}
            element={
              <ProtectedRoute>
                <Dashboardlayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="userdash" />} />
            {dashboardroutesconfig.map(({ path, Component }, index) => (
              <Route key={index} path={path} element={<Component />} />
            ))}
          </Route>
          {/* <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} /> */}
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
