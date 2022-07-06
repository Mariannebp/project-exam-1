/* Get posts */
const postsList = document.querySelector(".posts");
const moreButton = document.querySelector("button");

const baseUrl = "https://mbpedersen.no/photo_blog/wp-json/wp/v2/blog_post?acf_format=standard&per_page=";

let perPage = 10;

async function getPosts() {
  try {
    const response = await fetch(baseUrl + perPage);
    const posts = await response.json();

    console.log(posts);

    postsList.innerHTML = "";

    posts.forEach(function(post) {
      postsList.innerHTML += `
      <a href="blogspecific.html?id=${post.id}">
        <div class="post">
          <h2>${post.title.rendered}</h2>
          <p class="post-date">${post.acf.date}</p>
          <p>${post.excerpt.rendered}</p> 
          <img class="thumbnail" src=${post.acf.thumbnail} alt="${post.acf.alt_text}">
        </div>
      </a>
      `
    })  
  }
  catch (error) {
    postsList.innerHTML = `<p>Sorry, looks like something went wrong. Please try again.</p>`;

  }
}

getPosts();

/* Get more posts */

moreButton.addEventListener("click", () => {
  perPage += 10;
  getPosts();
});