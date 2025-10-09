import { enterUser, getUsers } from "./api.js";
import { render } from "./render.js";
import { renderRegistration } from "./renderRegistration.js";
import {
    updateCredentials,
    clearCredentials,
    status,
    updateStatus,
    updateToken,
} from "./array.js";

export function renderLogin() {
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
                type="password"
                class="add-form-name"
                id="password"
                placeholder="Введите ваш пароль"
                autocomplete="on"
                style="margin-top: 20px"
            />
            <div>
                <div class="add-form-row">
                    <button type="button" class="add-form-button" id="autorization">Авторизоваться</button>
                </div>
                <div class="add-form-row">
                    <button type="button" class="add-form-button" id="registration">Окно регистрации</button>
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
        updateCredentials();
        let login = document.getElementById("login");
        enterUser()
            .then((response) => {
                updateStatus(response.status);
                if (status === 400) {
                    throw new Error("Неверный логин или пароль");
                }
                clearCredentials();
                return response.json();
            })
            .then((data) => {
                updateToken(data.user.token);
                localStorage.setItem("token", data.user.token);
                render();
                getUsers()
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        const filteredData = data.users.filter(
                            (element) => element.login === login.value,
                        );
                        localStorage.setItem("user", filteredData[0].name);
                        let user = document.getElementById("user");
                        user.value = filteredData[0].name;
                        //user.readOnly = true;
                    });
            })
            .catch((error) => {
                alert(error);
            });
    });

    const registration = document.getElementById("registration");

    registration.addEventListener("click", () => {
        renderRegistration();
    });

    const comments = document.getElementById("comments");

    comments.addEventListener("click", () => {
        render();
    });
}
