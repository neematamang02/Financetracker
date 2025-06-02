import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import Dashboardlayout from "./Layout/Dashboardlayout";

import routesConfig from "./routes/routesConfig";
import dashboardroutesconfig from "./routes/dashboardroutesconfig";
import DASH_ROUTES from "./routes/dashboardroutes";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
  <Layout>
    <Routes>
      {/*
        Public routes (Login, Register, Landing, etc.)
        Wrapped in PublicRoute to auto-redirect logged-in users.
      */}
      {routesConfig.map(({ path, Component }, idx) => (
        <Route
          key={idx}
          path={path}
          element={
            <PublicRoute>
              <Component />
            </PublicRoute>
          }
        />
      ))}

      {/*
        Dashboard (protected) routes:
        /dashboard → Dashboardlayout,
        nested child routes under /dashboard/*
      */}
      <Route
        path={DASH_ROUTES.DashBoard}
        element={
          <ProtectedRoute>
            <Dashboardlayout />
          </ProtectedRoute>
        }
      >
        {/* Redirect /dashboard to the default child (userdash) */}
        <Route index element={<Navigate to="userdash" replace />} />
        {dashboardroutesconfig.map(({ path, Component }, idx) => (
          <Route key={idx} path={path} element={<Component />} />
        ))}
      </Route>

      {/* Catch-all: redirect any unknown URL to home (or 404 page) */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Layout>
);

export default App;
