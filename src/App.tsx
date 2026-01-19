import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainGamePage from "./pages/games/MainGamePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainGamePage />,
  },
  {
    path: "/:id",
    element: <div>hi</div>,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
