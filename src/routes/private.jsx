import { useContext } from "react"; // eslint-disable-line
import { Navigate } from "react-router-dom"; // eslint-disable-line
import { AuthContext } from "../contexts/auth"; // eslint-disable-line

export default function Private({ children }) {
  const { signed, loading } = useContext(AuthContext);
  console.log(signed);

  if (loading) {
    return <div></div>;
  }
  if (!signed) return <Navigate to="/" />;

  return children;
}
