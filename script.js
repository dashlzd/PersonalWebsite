const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

/* footer year */
const y = $("[data-year]");
if (y) y.textContent = new Date().getFullYear();

/* active nav link */
const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
$$("[data-nav]").forEach(a => {
  const href = (a.getAttribute("href") || "").toLowerCase();
  if (href === page) a.classList.add("active");
});

/* mobile nav */
const btn = $(".navBtn");
const nav = $("#nav");

if (btn && nav) {
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !btn.contains(e.target)) {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
}

/* modal (projects page) */
const modal = $("[data-modal]");
const mTitle = $("#mTitle");
const mDesc  = $("#mDesc");

function openModal(title, desc){
  if (!modal) return;
  modal.hidden = false;
  if (mTitle) mTitle.textContent = title || "Project";
  if (mDesc)  mDesc.textContent  = desc  || "";
}

function closeModal(){
  if (!modal) return;
  modal.hidden = true;
}

$$("[data-open]").forEach(b => {
  b.addEventListener("click", () => {
    const card = b.closest("[data-project]");
    if (!card) return;
    openModal(card.dataset.title, card.dataset.desc);
  });
});

$$("[data-close]").forEach(x => x.addEventListener("click", closeModal));
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});



document.addEventListener("click", (e) => {
  // 1) Navigate if the clicked element (or its parent) has a data-href
  const linkBtn = e.target.closest("[data-href]");
  if (linkBtn) {
    const href = linkBtn.dataset.href;
    if (href) window.location.href = href;
    return; // IMPORTANT: stop here so it won't also open the modal
  }

  // 2) Otherwise, open modal if the clicked element has data-open
  const openBtn = e.target.closest("[data-open]");
  if (!openBtn) return;

  const card = openBtn.closest("[data-project]");
  const title = card?.dataset.title || "";
  const desc  = card?.dataset.desc  || "";

  // replace this with your modal / panel logic
  alert(`${title}\n\n${desc}`);
});


/*About page clickable page*/
const bioBlock = document.querySelector(".bioBlock");

function setBioMode(){
  if (!bioBlock) return;

  if (window.innerWidth > 768) {
    bioBlock.open = true; // always open on desktop
  }
}

/*About resumeblock page*/
const resumeBlock = document.querySelector(".resumeBlock");

function setResumeMode(){
  if (!resumeBlock) return;

  if (window.innerWidth > 768) {
    resumeBlock.open = true;   // browser / desktop: always open
  } else if (!resumeBlock.dataset.mobileReady) {
    resumeBlock.open = false;  // mobile: closed first time
    resumeBlock.dataset.mobileReady = "true";
  }
}

setResumeMode();
window.addEventListener("resize", setResumeMode);


setBioMode();
window.addEventListener("resize", setBioMode);


/*About WorkingBlock page*/
const workingBlock = document.querySelector(".workingBlock");

function setWorkingMode(){
  if (!workingBlock) return;

  if (window.innerWidth > 768) {
    workingBlock.open = true;   // desktop: always open
  } else if (!workingBlock.dataset.mobileReady) {
    workingBlock.open = false;  // mobile: closed first time
    workingBlock.dataset.mobileReady = "true";
  }
}

setWorkingMode();
window.addEventListener("resize", setWorkingMode);



/*About myStory page*/
const myStory = document.querySelector(".myStory");

function setStoryMode(){
  if (!myStory) return;

  if (window.innerWidth > 768) {
    myStory.open = true;   // desktop: always open
  } else if (!myStory.dataset.mobileReady) {
    myStory.open = false;  // mobile: closed first time
    myStory.dataset.mobileReady = "true";
  }
}

setStoryMode();
window.addEventListener("resize", setStoryMode);



/*Projects slide*/
const projectGrid = document.querySelector(".grid");
const projectCards = document.querySelectorAll(".grid .projectCard");

function updateSelectedCard(){
  if (!projectGrid || projectCards.length === 0) return;

  const gridCenter = projectGrid.scrollLeft + projectGrid.clientWidth / 2;

  let closestCard = null;
  let closestDistance = Infinity;

  projectCards.forEach((card) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distance = Math.abs(gridCenter - cardCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestCard = card;
    }
  });

  projectCards.forEach((card) => {
    card.classList.remove("isSelected");
  });

  if (closestCard) {
    closestCard.classList.add("isSelected");
  }
}

if (projectGrid) {
  updateSelectedCard();
  projectGrid.addEventListener("scroll", updateSelectedCard);
  window.addEventListener("resize", updateSelectedCard);
}


/*Projects Slides dots*/
document.addEventListener("DOMContentLoaded", () => {
  const projectGrid = document.querySelector(".grid");
  const projectCards = document.querySelectorAll(".grid .projectCard");
  const projectDots = document.querySelectorAll(".projectDot");

  if (!projectGrid || projectCards.length === 0) return;

  function updateSelectedCard() {
    const gridCenter = projectGrid.scrollLeft + projectGrid.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    projectCards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(gridCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    projectCards.forEach((card) => {
      card.classList.remove("isSelected");
    });

    projectDots.forEach((dot) => {
      dot.classList.remove("isActive");
    });

    projectCards[closestIndex].classList.add("isSelected");

    if (projectDots[closestIndex]) {
      projectDots[closestIndex].classList.add("isActive");
    }
  }

  projectDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      const card = projectCards[index];
      if (!card) return;

      const targetLeft =
        card.offsetLeft - (projectGrid.clientWidth - card.offsetWidth) / 2;

      projectGrid.scrollTo({
        left: targetLeft,
        behavior: "smooth"
      });
    });
  });

  projectGrid.addEventListener("scroll", updateSelectedCard);
  window.addEventListener("resize", updateSelectedCard);

  updateSelectedCard();
});



const lightbox = document.querySelector("#imageLightbox");
const lightboxImg = document.querySelector(".lightboxImg");

const zoomImages = document.querySelectorAll(`

  .chLayout-01 img,
  .chLayout-02 img,
  .chLayout-04 img,
  .aiImageWrap-01-01 img,
  .aiImageWrap-02-01 img,
  .aiImageWrap-02-02 img,
  .aiImageWrap-02-03 img,
  .aiImageWrap-02-04 img,
  .aiImageWrap-02-05 img,
  .architectureimageWrap-02-01 img,
  .architectureimageWrap-02-02 img,
  .architectureimageWrap-02-03 img,
  .architectureimageWrap-03-01 img,
  .architectureimageWrap-04-01 img,
  .architectureimageWrap-04-02 img,
  .craftImageWrap-01-01 img,
  .craftImageWrap-01-02 img,
  .craftImageWrap-02-01 img,
  .craftImageWrap-02-02 img,
  .craftImageWrap-02-03 img,
  .craftImageWrap-03-01 img,
  .craftImageWrap-03-02 img,
  .craftImageWrap-04-01 img,
  .treatLayout img

`);

zoomImages.forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "Large project image";

    lightbox.classList.add("isOpen");
    document.body.classList.add("lightboxOpen");
  });
});

function closeLightbox(){
  lightbox.classList.remove("isOpen");
  document.body.classList.remove("lightboxOpen");
  lightboxImg.src = "";
}

lightbox.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});