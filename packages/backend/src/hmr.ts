import { Awaitable } from "./types";

export const onHmr = (callback: () => Awaitable<any>) => {
  const hot = (import.meta as any).hot;
  if (!hot.data.callbacks) {
    hot.data.callbacks = [];
  }

  hot.data.callbacks.push(callback);
};

export async function registerViteHmrServerRestart() {
  const hot = (import.meta as any).hot;
  if (hot) {
    await hot.data.stopping;
    // This is executed on file changed
    let reload = async () => {
      const callbacks = hot.data.callbacks || [];

      console.clear();
      console.log(
        `########## HMR (${callbacks.length} callbacks) ############\n`
      );

      for (const callback of callbacks) {
        await callback();
      }

      callbacks.length = 0;
    };
    hot.on("vite:beforeFullReload", async () => {
      const stopping = reload();
      reload = () => Promise.resolve();
      if (hot) hot.data.stopping = stopping;
    });
  }
}
