import api from "../axiosInstance";
import type { AllGame, ScreenshotsResponse, SingleGame } from "./rawg-types";

export const getGames = async (page:number,pageSize:number): Promise<AllGame> => {
  const { data } = await api.get("/games",{params:{page_size:pageSize,page}});
  return data;
};

export const getGame = async (id: number): Promise<SingleGame> => {
  const { data } = await api.get(`/games/${id}`);
  return data;
};

export const getGameScreenshots = async (
  id: number
): Promise<ScreenshotsResponse> => {
  const { data } = await api.get(`/games/${id}/screenshots`);
  return data;
};
