export function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("es-ES", options);
}

let postData = [];

export async function loadPosts() {
    try {
        const response = await fetch("data/posts.json?v=" + Date.now());
        postData = await response.json();
    } catch (error) {
        console.error("Error loading posts:", error);
    }
}

export function createPostCard(post) {
    const article = document.createElement("article");
    article.className = "card";
    article.setAttribute("data-post-id", post.id);

    const image = document.createElement("img");
    image.className = "card__image";
    image.src = post.image;
    image.alt = post.title;
    image.loading = "lazy";

    const content = document.createElement("div");
    content.className = "card__content";

    const date = document.createElement("time");
    date.className = "card__date";
    date.setAttribute("datetime", post.date);
    date.textContent = formatDate(post.date);

    const title = document.createElement("h2");
    title.className = "card__title";
    title.textContent = post.title;

    const excerpt = document.createElement("p");
    excerpt.className = "card__excerpt";
    excerpt.textContent = post.excerpt;

    const link = document.createElement("a");
    link.className = "card__link";
    link.href = post.link;
    link.textContent = "Leer más";

    content.appendChild(date);
    content.appendChild(title);
    content.appendChild(excerpt);
    content.appendChild(link);

    article.appendChild(image);
    article.appendChild(content);

    return article;
}

export async function renderPosts() {
    const container = document.querySelector('[data-posts-container]');
    if (!container) return;

    await loadPosts();
    container.innerHTML = "";
    postData.forEach((post) => {
        const card = createPostCard(post);
        container.appendChild(card);
    });
}