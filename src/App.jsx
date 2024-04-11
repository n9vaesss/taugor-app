import { BrowserRouter } from "react-router-dom"; //eslint-disable-line
import "./App.css"; //eslint-disable-line
import RouteApp from "./routes"; //eslint-disable-line
function App() {
  return (
    <BrowserRouter>
      <RouteApp />
    </BrowserRouter>
  );
}

export default App;
