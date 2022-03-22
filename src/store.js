import { writable, readable } from "svelte/store";
import { fileManager } from "./files.js";

const currentRoute = writable();
const currentPage = writable();

const userData = writable(JSON.parse(localStorage.getItem("userdata") ?? {}));

userData.subscribe(function (userData) {
  localStorage.setItem("userdata", JSON.stringify(userData));
});

export { currentRoute, userData, currentPage, fileManager };
