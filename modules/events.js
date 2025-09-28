import { likes, updateTag } from "./array.js";
import { format } from "./format.js";
import { container, renderLikes } from "./render.js";

let name = document.querySelector(".add-form-name");
let text = document.querySelector(".add-form-text");

let status = 0;

function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}

export const addEvent = () => {
    if (name.value !== "" && text.value !== "") {
        const form = document.querySelector(".add-form");
        form.style.display = "none";

        let waiting = document.createElement("p");
        waiting.textContent = "Комментарий добавляется...";
        waiting.style.textAlign = "center";
        container.append(waiting);

        name.classList.remove("warning");
        text.classList.remove("warning");

        const add = () => {
            fetch("https://wedev-api.sky.pro/api/v1/albert/comments", {
                method: "POST",
                body: JSON.stringify({
                    name: format(name.value),
                    text: format(text.value),
                    forceError: true,
                }),
            })
                .then((response) => {
                    status = response.status;
                    if (response.status === 400) {
                        throw new Error(
                            "Имя и комментарий должны быть не короче 3 символов",
                        );
                    } else if (response.status === 500) {
                        throw new Error("Сервер сломался, попробуй позже");
                    }
                    response.json();
                })
                .catch((error) => {
                    if (status != 400 && status != 500) {
                        alert(
                            "Кажется, у вас сломался интернет, попробуйте позже",
                        );
                    } else {
                        if (status === 500) {
                            add();
                        } else alert(error);
                    }
                })
                .finally(() => {
                    if (status == 201) {
                        name.value = "";
                        text.value = "";
                    }
                    if (status != 500) {
                        status = 0;
                        renderLikes();
                        waiting.remove();
                        form.style.removeProperty("display");
                    }
                });
        };
        add();
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
            event.stopPropagation();
            updateTag(true);
            button.classList.add("-loading-like");

            delay(2000).then(() => {
                likes[comment.dataset.index].isLiked
                    ? likes[comment.dataset.index].likes--
                    : likes[comment.dataset.index].likes++;
                likes[comment.dataset.index].isLiked =
                    !likes[comment.dataset.index].isLiked;

                renderLikes();
            });
        });
    }
};
