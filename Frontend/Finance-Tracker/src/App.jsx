import React from "react";
import Layout from "./Layout/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import routesConfig from "./routes/routesConfig";
import Dashboardlayout from "./Layout/Dashboardlayout";
import DASH_ROUTES from "./routes/dashboardroutes";
import dashboardroutesconfig from "./routes/dashboardroutesconfig";

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Routes>
          {routesConfig.map(({ path, Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
          <Route path={DASH_ROUTES.DashBoard} element={<Dashboardlayout />}>
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
// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";

// export default function App() {
//   return (
//     <header className="container mx-auto flex justify-end mt-4">
//       <SignedOut>
//         <button className="bg-zinc-800 py-2 px-4 text-white rounded-lg cursor-pointer hover:bg-zinc-800/80 duration-200">
//           <SignInButton />
//         </button>
//       </SignedOut>
//       <SignedIn>
//         <UserButton />
//       </SignedIn>
//     </header>
//   );
// }
