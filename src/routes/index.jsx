import { Routes, Route } from "react-router-dom"; //eslint-disable-line
import SingIn from "../pages/SingIn"; //eslint-disable-line
import SingUp from "../pages/SingUp"; //eslint-disable-line

function RouteApp() {
  return (
    <Routes>
      <Route path="/" element={<SingIn />} />
      <Route path="/register" element={<SingUp />} />
    </Routes>
  );
}
export default RouteApp;
