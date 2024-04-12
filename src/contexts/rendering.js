import { createContext, useState } from "react"; //eslint-disable-line

export const RenderingContext = createContext({});

function RenderingProvider({ children }) {
  const [optionsDashboard, setOptionsDashboard] = useState("Cadastrar");//eslint-disable-line

  return (
    <RenderingContext.Provider
      value={{ optionsDashboard, setOptionsDashboard }}
    >
      {children}
    </RenderingContext.Provider>
  );
}

export default RenderingProvider;
