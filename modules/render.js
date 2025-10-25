import {
    likes,
    updateLikes,
    tag,
    updateTag,
    token,
    updateToken,
} from "./array.js";
import { initLikes, addEvent } from "./events.js";
import { getComments } from "./api.js";
import { renderLogin } from "./renderAutorization.js";

let start = false;

const fetchAndRenderLikes = () => {
    return getComments()
        .then((response) => response.json())
        .then((data) => updateLikes(data.comments));
};

export function render() {
    const app = document.querySelector(".app");
    if (start) {
        app.innerHTML = `<div class="container">
                <ul class="comments">
                </ul>
                <form class="add-form">
                </form>
            </div>`;
    }
    start = true;
    const form = document.querySelector(".add-form");
    if (!token) {
        form.innerHTML = `<button type="button" class="add-form-button">Чтобы добавить комментарий, авторизуйтесь</button>`;
        let button = document.querySelector(".add-form-button");
        button.addEventListener("click", renderLogin);
    } else {
        form.innerHTML = `
          <input
              type="text"
              class="add-form-name"
              id="user"
              placeholder="Введите ваше имя"
              value=${localStorage.getItem("user")}
              readOnly
          />
          <textarea
              type="textarea"
              class="add-form-text"
              id="text"
              placeholder="Введите ваш коментарий"
              rows="4"
          ></textarea>
          <div class="add-form-row">
              <button type="button" id="submit" class="add-form-button">Написать</button>
          </div>
          <div class="add-form-row">
              <button type="button" id="exit" class="add-form-button">Выход</button>
          </div>`;
        let submit = document.getElementById("submit");
        submit.addEventListener("click", addEvent);
        let exit = document.getElementById("exit");
        exit.addEventListener("click", () => {
            updateToken("");
            localStorage.setItem("token", "");
            localStorage.setItem("user", { value: "" });
            render();
        });
    }
    renderLikes();
}

export function renderLikes() {
    const container = document.querySelector(".comments");
    if (!tag) {
        fetchAndRenderLikes().then(() => {
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
