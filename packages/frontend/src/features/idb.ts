import { createStore, del } from "idb-keyval";

export const getPicturesStore = () => createStore("toSync", "images");
export const getToUploadStore = () => createStore("toUpload", "images");
export const getUploadStatusStore = () => createStore("uploadStatus", "images");

export const syncImages = async () => {
  console.log("sync");
  const registration = await navigator.serviceWorker.ready;
  await registration.sync.register("images");
};

export const deleteImageFromIdb = async (id: string) => {
  await del(id, getPicturesStore());
  await del(id, getToUploadStore());
  await del(id, getUploadStatusStore());
};
