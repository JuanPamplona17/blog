import { initTheme } from "./theme.js";
import { renderPosts } from "./posts.js";
import { initMobileMenu } from "./mobile-menu.js";

async function init() {
    initTheme();
    await renderPosts();
    initMobileMenu();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}