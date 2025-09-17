import { likes } from "./array.js";
import { format } from "./format.js";
import { renderLikes } from "./render.js";

let name = document.querySelector(".add-form-name");
let text = document.querySelector(".add-form-text");

export const addEvent = () => {
    if (name.value !== "" && text.value !== "") {
        name.classList.remove("warning");
        text.classList.remove("warning");

        const currentDate = new Date();
        // let comment = document.createElement("li");

        // comment.innerHTML =
        //   `<div class="comment-header">
        //     <div>${name.value}</div>
        //     <div>${currentDate.toLocaleDateString('ru-RU') + " " + currentDate.toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'})}</div>
        //   </div>
        //   <div class="comment-body">
        //     <div class="comment-text">
        //       ${text.value}
        //     </div>
        //   </div>
        //   <div class="comment-footer">
        //     <div class="likes">
        //       <span class="likes-counter">0</span>
        //       <button class="like-button"></button>
        //     </div>
        //   </div>`;

        // comment.classList.add("comment");
        // comments.appendChild(comment);

        likes.push({
            name: format(name.value),
            date:
                currentDate.toLocaleDateString("ru-RU") +
                " " +
                currentDate.toLocaleTimeString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            comment: format(text.value),
            counter: 0,
            active: false,
        });
        name.value = "";
        text.value = "";
    } else {
        if (name.value === "") {
            name.classList.add("warning");
        } else {
            name.classList.remove("warning");
        }
        if (text.value === "") {
            text.classList.add("warning");
        } else {
            text.classList.remove("warning");
        }
    }

    renderLikes(likes);
};

export const initLikes = () => {
    const comments = document.querySelectorAll(".comment");

    for (const comment of comments) {
        const button = comment.querySelector(".like-button");

        comment.addEventListener("click", () => {
            name.value = likes[comment.dataset.index].name;
            text.value = "> " + likes[comment.dataset.index].comment + "\n";
            renderLikes(likes);
        });

        button.addEventListener("click", (event) => {
            event.stopPropagation();
            likes[comment.dataset.index].active
                ? likes[comment.dataset.index].counter--
                : likes[comment.dataset.index].counter++;
            likes[comment.dataset.index].active =
                !likes[comment.dataset.index].active;
            renderLikes(likes);
        });
    }
};
