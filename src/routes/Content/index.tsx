import { Routes, Route } from "react-router-dom";
import { ROUTES_MAP } from "../constant";

const Content: React.FC = () => {
  return (
    <Routes>
      {Object.keys(ROUTES_MAP).map((path) => (
        <Route key={path} path={path} element={ROUTES_MAP[path]} />
      ))}
    </Routes>
  );
};

export default Content;
