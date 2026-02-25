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
  const btn = e.target.closest("[data-open]");
  if(!btn) return;

  const card = btn.closest("[data-project]");
  const title = card?.dataset.title;
  const desc = card?.dataset.desc;

  // replace this with your modal / panel logic
  alert(`${title}\n\n${desc}`);
});



