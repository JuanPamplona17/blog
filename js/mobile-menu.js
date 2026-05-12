const NAV_OPEN_CLASS = "mobile-active";

export function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('[data-mobile-menu]');
    const nav = document.querySelector(".nav");

    mobileMenuBtn.addEventListener("click", () => {
        nav.classList.toggle(NAV_OPEN_CLASS);
    });

    document.addEventListener("click", (e) => {
        if (
            !e.target.closest('[data-mobile-menu]') &&
            !e.target.closest(".nav")
        ) {
            nav.classList.remove(NAV_OPEN_CLASS);
        }
    })
}