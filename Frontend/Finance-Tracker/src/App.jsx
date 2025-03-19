import React from "react";
import Layout from "./Layout/Layout";
import { Route, Routes } from "react-router-dom";
import routesConfig from "./routes/routesConfig";

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Routes>
          {routesConfig.map(({ path, Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
