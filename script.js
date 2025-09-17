import { addEvent } from "./modules/events.js";
import { renderLikes } from "./modules/render.js";

("use strict");
let button = document.querySelector(".add-form-button");

button.addEventListener("click", addEvent);

renderLikes();
