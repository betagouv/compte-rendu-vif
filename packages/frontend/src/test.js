console.log("salut à tous");

self.addEventListener("sync", (event) => {
  console.log(event.tag, event);
});
