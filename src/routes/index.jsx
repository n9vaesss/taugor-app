import { Routes, Route } from "react-router-dom"; //eslint-disable-line
import SingIn from "../pages/SingIn"; //eslint-disable-line
import SingUp from "../pages/SingUp"; //eslint-disable-line
import Dashboard from "../pages/Dashboard"; //eslint-disable-line
import Private from "./private"; //eslint-disable-line

function RouteApp() {
  return (
    <Routes>
      <Route path="/" element={<SingIn />} />
      <Route path="/register" element={<SingUp />} />
      <Route
        path="/dashboard"
        element={
          <Private>
            <Dashboard />
          </Private>
        }
      />
    </Routes>
  );
}
export default RouteApp;
