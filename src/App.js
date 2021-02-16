import React, { useState, useEffect } from "react";
import Processor from "./components/parts/Processor";
import GraphicsCards from "./components/parts/GraphicsCards";
import Motherboard from "./components/parts/Motherboard";
import Psu from "./components/parts/Psu";
import Ram from "./components/parts/Ram";
import Cabinet from "./components/parts/Cabinet";
import Storage from "./components/parts/Storage";
import Orders from "./components/Orders";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Laptop from "./components/Laptop";
import PreBuild from "./components/PreBuild";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Settings from "./components/Settings";
import Axios from "axios";
import AdminContext from "./context/AdminContext";
import Accesories from "./components/parts/Accesories";
import Cooler from "./components/parts/Cooler";

function App() {
  const [admin, setadmin] = useState({
    id: undefined,
    admin: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let idauth = localStorage.getItem("x-auth-id");

      if (idauth === null) {
        localStorage.setItem("x-auth-id", null);
        idauth = "";
      }

      const idRes = await Axios.post(
        "https://thetechhub-admin.herokuapp.com/settings/tokenIsValid",
        null,
        {
          headers: { "x-auth-id": idauth },
        }
      );

      if (idRes.data) {
        const res = await Axios.get(
          "https://thetechhub-admin.herokuapp.com/settings",
          {
            headers: { "x-auth-id": idauth },
          }
        );
        setadmin({
          idauth,
          admin: res.data,
        });
      }
    };
    checkLoggedIn();
  });

  return (
    <AdminContext.Provider value={{ admin, setadmin }}>
      <Router>
        <NavBar />
        <Switch>
          {admin.admin ? (
            <>
              <Route exact path="/">
                <Orders />
              </Route>
              <Route exact path="/laptop">
                <Laptop />
              </Route>
              <Route exact path="/prebuild">
                <PreBuild />
              </Route>
              <Route exact path="/processor">
                <Processor />
              </Route>
              <Route path="/graphicscard">
                <GraphicsCards />
              </Route>
              <Route path="/motherboard">
                <Motherboard />
              </Route>
              <Route path="/admin-frontend/ram">
                <Ram />
              </Route>
              <Route path="/cabinet">
                <Cabinet />
              </Route>
              <Route path="/storage">
                <Storage />
              </Route>
              <Route path="/psu">
                <Psu />
              </Route>
              <Route path="/cooler">
                <Cooler />
              </Route>
              <Route path="/accesories">
                <Accesories />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
            </>
          ) : (
            <Route path="/login">
              <Login />
            </Route>
          )}
        </Switch>
      </Router>
    </AdminContext.Provider>
  );
}

export default App;
