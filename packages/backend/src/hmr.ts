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
    const callbacks = hot.data.callbacks || [];

    console.clear();
    console.log(
      `########## HMR (${callbacks.length} callbacks) ############\n`
    );

    for (const callback of callbacks) {
      await callback();
    }

    callbacks.length = 0;
  }
}
