const THEME_KEY = "blog-theme";
const DARK_CLASS = "dark";

export function getFromStorage() {
    try {
        const item = localStorage.getItem(THEME_KEY);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        return null;
    }
}

export function saveToStorage(value) {
    try {
        localStorage.setItem(THEME_KEY, JSON.stringify(value));
    } catch (e) {

    }
}

export function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getCurrentTheme() {
    const saved = getFromStorage();
    return saved || getSystemTheme();
}

function updateToggleButton(theme) {
    const toggle = document.querySelector('[data-theme-toggle]');
    if (!toggle) return;

    const moonIcon = toggle.querySelector(".icon-moon");
    const sunIcon = toggle.querySelector(".icon-sun");

    if (theme === "dark") {
        if (moonIcon) moonIcon.classList.add("hidden-icon");
        if (sunIcon) sunIcon.classList.remove("hidden-icon");
    } else {
        if (moonIcon) moonIcon.classList.remove("hidden-icon");
        if (sunIcon) sunIcon.classList.add("hidden-icon");
    }
}

export function setTheme(theme) {
    const html = document.documentElement;
    if (theme === "dark") {
        html.classList.add(DARK_CLASS);
        html.classList.remove("light");
    } else {
        html.classList.remove(DARK_CLASS);
        html.classList.add("light");
    }
    saveToStorage(theme);
    updateToggleButton(theme);
}

export function toggleTheme() {
    const current = getCurrentTheme();
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
}

export function initTheme() {
    const theme = getCurrentTheme();
    setTheme(theme);

    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
        toggle.addEventListener("click", toggleTheme);
    }

    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
            if (!getFromStorage(THEME_KEY)) {
                setTheme(e.matches ? "dark" : "light");
            }
        });
}