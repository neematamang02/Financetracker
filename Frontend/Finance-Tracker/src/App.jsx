// import React from "react";
// import Layout from "./Layout/Layout";
// import { Navigate, Route, Routes } from "react-router-dom";
// import routesConfig from "./routes/routesConfig";
// import Dashboardlayout from "./Layout/Dashboardlayout";
// import DASH_ROUTES from "./routes/dashboardroutes";
// import dashboardroutesconfig from "./routes/dashboardroutesconfig";
// import ProtectedRoute from "./components/ProtectedRoute";

// const App = () => {
//   return (
//     <div className="App">
//       <Layout>
//         <Routes>
//           {routesConfig.map(({ path, Component }, index) => (
//             <Route key={index} path={path} element={<Component />} />
//           ))}
//           <Route
//             path={DASH_ROUTES.DashBoard}
//             element={
//               <ProtectedRoute>
//                 <Dashboardlayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route index element={<Navigate to="userdash" />} />
//             {dashboardroutesconfig.map(({ path, Component }, index) => (
//               <Route key={index} path={path} element={<Component />} />
//             ))}
//           </Route>
//           {/* <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} /> */}
//         </Routes>
//       </Layout>
//     </div>
//   );
// };

// export default App;
// src/App.jsx
import React from "react";
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
