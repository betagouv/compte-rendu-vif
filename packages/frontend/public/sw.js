console.log("salut");

self.addEventListener("sync", (event) => {
  console.log(event.tag, event);
});
