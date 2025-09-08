import { likes } from "./array.js";
import { initLikes } from "./events.js";

export function renderLikes() {
    const container = document.querySelector(".comments");
    container.innerHTML = likes
        .map(
            (element, index) => `
    <li class="comment" data-index="${index}">
      <div class="comment-header">
        <div>${element.name}</div>
        <div>${element.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${element.comment}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${element.counter}</span>
          <button class="like-button ${element.active ? "-active-like" : ""}"></button>
        </div>
      </div>
    </li>
  `,
        )
        .join("");

    initLikes();
}
