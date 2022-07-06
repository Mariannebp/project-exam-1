/* Get Welcome Content */

const welcome = document.querySelector(".home-welcome");
const url = "https://mbpedersen.no/photo_blog/wp-json/wp/v2/pages/48";

async function getWelcome(url) {
  const response = await fetch(url);
  const content = await response.json();

  console.log(content);

  welcome.innerHTML = `
    <h1>${content.title.rendered}</h1>
    <p class="short_text">${content.content.rendered}</p>
  `
};

getWelcome(url);


/* Get Carousel Posts */

const carouselContent = document.querySelector(".home-carousel-content");
const newUrl = "https://mbpedersen.no/photo_blog/wp-json/wp/v2/blog_post?acf_format=standard&per_page=8";

async function getRecent(newUrl) {
  try {
    const response = await fetch(newUrl);
    const result = await response.json();

    console.log(result);

    carouselContent.innerHTML = "";

    result.forEach(function(post) {
      carouselContent.innerHTML += `
        <a href="blogspecific.html?id=${post.id}">
          <div class="home-carousel-content-cards">
            <h3>${post.title.rendered}</h3>
            <img class="thumbnail" src=${post.acf.thumbnail} alt="${post.acf.alt_text}">
          </div>
        </a>
      `
    }) 
  }
  catch (error) {
    carouselContent.innerHTML = `<p>Sorry, looks like something went wrong.</p>`;
  }
}

getRecent(newUrl);


/* Making a Carousel */

const carousel = document.querySelector(".home-carousel-content");
const olderButton = document.querySelector(".home-carousel-newer");
const newerButton = document.querySelector(".home-carousel-older");


newerButton.addEventListener("click", () => {
  carousel.style.transform = "translateX(-100%)";
  olderButton.style.display = "block";
  newerButton.style.display = "none";
});

olderButton.addEventListener("click", () => {
  carousel.style.transform = "translateX(-0%)";
  olderButton.style.display = "none";
  newerButton.style.display = "block";
});








