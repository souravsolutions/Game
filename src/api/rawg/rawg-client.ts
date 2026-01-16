import api from "../axiosInstance";

export const getGames = async () => {
  const { data } = await api.get("/games");
  return data;
};

export const getGame = async (id: string) => {
  const { data } = await api.get(`/games/${id}`);
  return data;
};

export const getGameScreenshots = async (id: string) => {
  const { data } = await api.get(`/games/${id}/screenshots`);
  return data;
};
