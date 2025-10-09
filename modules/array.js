export let likes = [];

export const updateLikes = (newLikes) => {
    likes = newLikes;
};

export let tag = false;

export const updateTag = (newTag) => {
    tag = newTag;
};

//export let token = "";
export let token = localStorage.getItem("token");

export const updateToken = (newToken) => {
    token = newToken;
};

export let status = 0;

export const updateStatus = (newStatus) => {
    status = newStatus;
};

export let user = { value: "" };
export let text = { value: "" };
export let login = { value: "" };
export let name = { value: "" };
export let password = { value: "" };

export const updateCredentials = () => {
    user = document.getElementById("user");
    text = document.getElementById("text");
    login = document.getElementById("login");
    name = document.getElementById("name");
    password = document.getElementById("password");
};

export const clearCredentials = () => {
    //user = { value: "" };
    text = { value: "" };
    login = { value: "" };
    name = { value: "" };
    password = { value: "" };
};
