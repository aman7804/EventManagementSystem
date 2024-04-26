import "./App.css";
import "./config";
import { RouterProvider } from "react-router-dom";
import { router } from "routes/collection";

const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App