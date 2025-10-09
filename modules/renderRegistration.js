import { createUser } from "./api.js";
import { renderLogin } from "./renderAutorization.js";
import { render } from "./render.js";
import {
    updateCredentials,
    clearCredentials,
    status,
    updateStatus,
} from "./array.js";

export function renderRegistration() {
    const app = document.querySelector(".app");

    app.innerHTML = `
    <div class="container">
         <form class="add-form">
            <input
               type="text"
               class="add-form-name"
               id="login"
               placeholder="Введите ваш логин"
            />
            <input
               type="text"
               class="add-form-name"
               id="name"
               placeholder="Введите ваше имя"
               style="margin-top: 20px"
            />
            <input
               type="password"
               class="add-form-name"
               id="password"
               placeholder="Введите ваш пароль"
               autocomplete="on"
               style="margin-top: 20px"
            />
            <div>
                <div class="add-form-row">
                  <button type="button" class="add-form-button" id="registration">Зарегистрироваться</button>
                </div>
                <div class="add-form-row">
                    <button type="button" class="add-form-button" id="autorization">Окно авторизации</button>
                </div>
                <div class="add-form-row">
                    <button type="button" class="add-form-button" id="comments">Комментарии</button>
                </div>
                <div class="add-form-row">
                    <button type="button" class="add-form-button" id="comments">Комментарии</button>
                </div>
            </div>  
         </form>
      </div>
      `;

    const login = document.getElementById("autorization");

    login.addEventListener("click", () => {
        renderLogin();
    });

    const registration = document.getElementById("registration");

    registration.addEventListener("click", () => {
        updateCredentials();
        createUser()
            .then((response) => {
                updateStatus(response.status);
                if (status === 400) {
                    throw new Error(
                        "Такой пользователь существует или не заполнены все поля",
                    );
                }
                renderLogin();
                clearCredentials();
                return response.json();
            })
            .catch((error) => {
                alert(error);
            });
    });

    const comments = document.getElementById("comments");

    comments.addEventListener("click", () => {
        render();
    });
}
