import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GamesPage from "./pages/games/GamesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GamesPage />,
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
