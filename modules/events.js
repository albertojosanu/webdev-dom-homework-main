import { likes, updateTag } from "./array.js";
import { format } from "./format.js";
import { renderLikes } from "./render.js";

let name = document.querySelector(".add-form-name");
let text = document.querySelector(".add-form-text");

export const addEvent = () => {
    if (name.value !== "" && text.value !== "") {
        name.classList.remove("warning");
        text.classList.remove("warning");

        fetch("https://wedev-api.sky.pro/api/v1/albert/comments", {
            method: "POST",
            body: JSON.stringify({
                name: format(name.value),
                text: format(text.value),
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .then(() => {
                renderLikes();
                name.value = "";
                text.value = "";
            });
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
};

export const initLikes = () => {
    const comments = document.querySelectorAll(".comment");

    for (const comment of comments) {
        const button = comment.querySelector(".like-button");

        comment.addEventListener("click", () => {
            name.value = likes[comment.dataset.index].author.name;
            text.value = "> " + likes[comment.dataset.index].text + "\n";
            renderLikes();
        });

        button.addEventListener("click", (event) => {
            updateTag(true);
            event.stopPropagation();
            likes[comment.dataset.index].isLiked
                ? likes[comment.dataset.index].likes--
                : likes[comment.dataset.index].likes++;
            likes[comment.dataset.index].isLiked =
                !likes[comment.dataset.index].isLiked;
            renderLikes();
        });
    }
};
