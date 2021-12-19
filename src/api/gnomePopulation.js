import { GNOME_API_ENDPOINT } from "../constants/api";

export const getGnomePopulation = () =>
  fetch(GNOME_API_ENDPOINT).then((res) => res.json());
