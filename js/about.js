const about = document.querySelector(".about_container");
const url = "https://mbpedersen.no/photo_blog/wp-json/wp/v2/pages/24";

async function getAbout(url) {
  const response = await fetch(url);
  const content = await response.json();

  console.log(content);

  about.innerHTML = `
    <h1>${content.title.rendered}</h1>
    <p class="short_text">${content.content.rendered}</p>
  `
};

getAbout(url);

