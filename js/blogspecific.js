const headTitle = document.querySelector("title");
const navTitle = document.querySelector(".active");
const postContainer = document.querySelector(".post-container");
const postContent = document.querySelector(".post-content");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

console.log(id);

const urlId = "https://mbpedersen.no/photo_blog/wp-json/wp/v2/blog_post/" + id + "?acf_format=standard";

console.log(urlId);

async function getPost() {
  try {
    const response = await fetch(urlId);
    const specificPost = await response.json();

    console.log(specificPost);

    headTitle.innerHTML = `Photographer blog | ${specificPost.title.rendered}`;
    navTitle.innerHTML = `${specificPost.title.rendered}`;

    postContent.innerHTML = `
      <h1 class="post-title">${specificPost.title.rendered}</h1>
      <p class="post-date">${specificPost.acf.date}</p>
      <div>${specificPost.content.rendered}</div>
    `;
  }
  catch (error) {
    post.innerHTML = `<p>Sorry, something went wrong</p>`;
  }
};

getPost();

/* Modal images */

const showModal = document.querySelector(".post-content");
const modalContainer = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");

function openModal(event) {
  const modalImg = event.target;
  const imgSrc = modalImg.src;

  if (modalImg.src) {
    modalContent.innerHTML = `<img src=${imgSrc} />`; 
    modalContainer.classList.add("open");
  }
}

function closeModal(event) {
  const checkIfOutside = !event.target.closest(".modal-content");
  if (checkIfOutside) {
   modalContainer.classList.remove("open"); 
  }
}

showModal.addEventListener("click", openModal);

modalContainer.addEventListener("click", closeModal);