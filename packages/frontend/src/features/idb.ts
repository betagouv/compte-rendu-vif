import { createStore, keys, set } from "idb-keyval";
import { promisifyRequest } from "idb-keyval";

export const getPicturesStore = () => createStore("toSync", "images");

export const syncImages = async () => {
  const registration = await navigator.serviceWorker.ready;
  await registration.sync.register("images");
};
