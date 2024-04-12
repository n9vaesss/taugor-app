import { BrowserRouter } from "react-router-dom"; //eslint-disable-line
import "./App.css"; //eslint-disable-line
import RouteApp from "./routes"; //eslint-disable-line
import AuthProvider from "./contexts/auth"; //eslint-disable-line
import RenderingProvider from "./contexts/rendering"; //eslint-disable-line
import { ToastContainer } from "react-toastify"; //eslint-disable-line
import 'react-toastify/dist/ReactToastify.css'; //eslint-disable-line
function App() {
  return (
    <BrowserRouter>
      <RenderingProvider>
        <AuthProvider>
          <ToastContainer autoClose={3000} />
          <RouteApp />
        </AuthProvider>
      </RenderingProvider>
    </BrowserRouter>
  );
}

export default App;
