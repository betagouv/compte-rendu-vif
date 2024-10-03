import { createStore } from "idb-keyval";

export const getPicturesStore = () => createStore("toSync", "images");

export const syncImages = async () => {
  console.log("sync");
  const registration = await navigator.serviceWorker.ready;
  await registration.sync.register("images");
};
