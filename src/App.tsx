import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainGamePage from "./pages/games/MainGamePage";
import GamesPage from "./pages/game/GamePage";

const router = createBrowserRouter([
  {
    path: "/games",
    element: <MainGamePage />,
  },
  {
    path: "/games/:id",
    element: <GamesPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
