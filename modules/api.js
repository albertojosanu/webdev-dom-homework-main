import { format } from "./format.js";
import { token, user, text, login, name, password } from "./array.js";

export const getComments = () => {
    return fetch("https://wedev-api.sky.pro/api/v2/albert/comments", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const postComment = () => {
    return fetch("https://wedev-api.sky.pro/api/v2/albert/comments", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: format(user.value),
            text: format(text.value),
            forceError: true,
        }),
    });
};

export const getUsers = () => {
    return fetch("https://wedev-api.sky.pro/api/user", {
        method: "GET",
    });
};

export const createUser = () => {
    return fetch("https://wedev-api.sky.pro/api/user", {
        method: "POST",
        body: JSON.stringify({
            login: format(login.value),
            name: format(name.value),
            password: format(password.value),
        }),
    });
};

export const enterUser = () => {
    return fetch("https://wedev-api.sky.pro/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login: format(login.value),
            password: format(password.value),
        }),
    });
};
