import { likes, updateLikes, tag, updateTag } from "./array.js";
import { initLikes } from "./events.js";

export function renderLikes() {
    if (!tag) {
        fetch("https://wedev-api.sky.pro/api/v1/albert/comments", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                updateLikes(data.comments);

                const container = document.querySelector(".comments");
                container.innerHTML = likes
                    .map(
                        (element, index) => `
            <li class="comment" data-index="${index}">
              <div class="comment-header">
                <div>${element.author.name}</div>
                <div>${new Date(element.date).toLocaleString("ru-RU").replaceAll(/,/gi, " ")}</div>
              </div>
              <div class="comment-body">
                <div class="comment-text">
                  ${element.text}
                </div>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${element.likes}</span>
                  <button class="like-button ${element.isLiked ? "-active-like" : ""}"></button>
                </div>
              </div>
            </li>
            `,
                    )
                    .join("");
                initLikes();
            });
    } else {
        const container = document.querySelector(".comments");
        container.innerHTML = likes
            .map(
                (element, index) => `
            <li class="comment" data-index="${index}">
              <div class="comment-header">
                <div>${element.author.name}</div>
                <div>${new Date(element.date).toLocaleString("ru-RU").replaceAll(/,/gi, " ")}</div>
              </div>
              <div class="comment-body">
                <div class="comment-text">
                  ${element.text}
                </div>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${element.likes}</span>
                  <button class="like-button ${element.isLiked ? "-active-like" : ""}"></button>
                </div>
              </div>
            </li>
            `,
            )
            .join("");
        updateTag(false);
        initLikes();
    }
}
