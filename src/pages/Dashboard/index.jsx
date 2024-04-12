import { useContext } from "react"; //eslint-disable-line
import EmployeeRegistration from "../../components/EmployeeRegistration"; //eslint-disable-line
import ResponsiveAppBar from "../../components/materialComponents/AppBar"; // eslint-disable-line
import { RenderingContext } from "../../contexts/rendering"; // eslint-disable-line
import EmployeeUpdate from "../../components/EmployeeUpdate/EmployeeUpdate";

export default function Dashboard() {
  const { optionsDashboard } = useContext(RenderingContext);

  return (
    <div>
      <ResponsiveAppBar />
      {optionsDashboard === "Cadastrar" ? ( // eslint-disable-line
        <EmployeeRegistration />
      ) : (
        <EmployeeUpdate/>
      )}
    </div>
  );
}
