// ─── NAV: scrolled state + mobile drawer ───
const nav = document.getElementById("nav");
const burger = document.getElementById("burger");
const drawer = document.getElementById("drawer");

const onScroll = () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

if (burger && drawer) {
  burger.addEventListener("click", () => {
    drawer.classList.toggle("open");
  });
  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => drawer.classList.remove("open"));
  });
}

// ─── REVEAL ON SCROLL ───
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// ─── OZZA CONNECT: product tabs (veste / pantalon) ───
const connectTabs = document.querySelectorAll(".connect-tabs .c-filter");
const connectGalleries = document.querySelectorAll(".connect-gallery .jacket-left");
const connectInfos = document.querySelectorAll(".connect-info");

connectTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    connectTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const product = tab.dataset.product;
    connectGalleries.forEach((g) => g.classList.toggle("active", g.dataset.product === product));
    connectInfos.forEach((i) => i.classList.toggle("active", i.dataset.product === product));
  });
});

// ─── OZZA CONNECT: colour swatches (simulated app control) ───
document.querySelectorAll(".jacket-left").forEach((panel) => {
  const dots = panel.querySelectorAll(".j-dot");
  const img = panel.querySelector("img");
  const tag = panel.querySelector(".j-color-tag");

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      dots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");
      if (img) img.style.filter = dot.dataset.filter || "none";
      if (tag) tag.textContent = dot.dataset.color;
    });
  });
});

// ─── CONTACT FORM ───
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitBtn = document.getElementById("fSubmit");
    submitBtn.firstChild.textContent = "Envoyé — merci ";
    contactForm.reset();
  });
}
