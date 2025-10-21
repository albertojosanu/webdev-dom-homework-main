import {
    likes,
    updateTag,
    status,
    updateStatus,
    user,
    text,
    token,
} from "./array.js";
import { renderLikes } from "./render.js";
import { render } from "./render.js";
import { postComment } from "./api.js";
import { updateCredentials } from "./array.js";

function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}

export const addEvent = () => {
    updateCredentials();
    if (user.value !== "" && text.value !== "") {
        const form = document.querySelector(".add-form");
        form.style.display = "none";

        const container = document.querySelector(".comments");
        let waiting = document.createElement("p");
        waiting.textContent = "Комментарий добавляется...";
        waiting.style.textAlign = "center";
        container.append(waiting);

        user.classList.remove("warning");
        text.classList.remove("warning");

        const add = () => {
            return postComment()
                .then((response) => {
                    updateStatus(response.status);
                    if (response.status === 400) {
                        throw new Error(
                            "Имя и комментарий должны быть не короче 3 символов",
                        );
                    } else if (response.status === 500) {
                        throw new Error("Сервер сломался, попробуй позже");
                    }
                    return response.json();
                })
                .catch((error) => {
                    if (status !== 400 && status !== 500) {
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
                    if (status === 201) {
                        user.value = "";
                        text.value = "";
                    }
                    if (status !== 500) {
                        updateStatus(0);
                        render();
                        waiting.remove();
                        form.style.display = "flex";
                    }
                });
        };
        add();
    } else {
        if (user.value === "") {
            user.classList.add("warning");
        } else {
            user.classList.remove("warning");
        }
        if (text.value === "") {
            text.classList.add("warning");
        } else {
            text.classList.remove("warning");
        }
    }
};

export const initLikes = () => {
    if (token) {
        const comments = document.querySelectorAll(".comment");
        const text = document.getElementById("text");

        for (const comment of comments) {
            const button = comment.querySelector(".like-button");

            comment.addEventListener("click", () => {
                text.value =
                    "> " + likes[comment.dataset.index].text + "\n" + "\n";
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
    }
};
