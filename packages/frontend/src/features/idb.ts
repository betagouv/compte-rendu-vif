import { createStore, del } from "idb-keyval";

export const getPicturesStore = () => createStore("toSync", "images");
export const getToUploadStore = () => createStore("toUpload", "images");
export const getUploadStatusStore = () => createStore("uploadStatus", "images");

export const deleteImageFromIdb = async (id: string) => {
  await del(id, getPicturesStore());
  await del(id, getToUploadStore());
  await del(id, getUploadStatusStore());
};
