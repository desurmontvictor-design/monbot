// ─── NAV: scrolled state + mobile drawer ───
const nav = document.getElementById("nav");
const burger = document.getElementById("burger");
const drawer = document.getElementById("drawer");

const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

if (burger && drawer) {
  burger.addEventListener("click", () => drawer.classList.toggle("open"));
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

// ─── OZZA CONNECT: tabs (veste / pantalon) ───
const tabs = document.querySelectorAll(".connect-tabs .tab");
const slides = document.querySelectorAll(".connect-slide");
const infos = document.querySelectorAll(".connect-info");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const product = tab.dataset.product;
    slides.forEach((s) => s.classList.toggle("active", s.dataset.product === product));
    infos.forEach((i) => i.classList.toggle("active", i.dataset.product === product));
  });
});

// ─── OZZA CONNECT: colour swatches (simulated app control) ───
const swatches = document.querySelectorAll(".swatch");
const appColorLabel = document.getElementById("appColorLabel");

swatches.forEach((swatch) => {
  swatch.addEventListener("click", () => {
    swatches.forEach((s) => s.classList.remove("active"));
    swatch.classList.add("active");

    if (appColorLabel) appColorLabel.textContent = swatch.dataset.color;

    document.querySelectorAll(".connect-slide.active img").forEach((img) => {
      img.style.filter = swatch.dataset.filter || "none";
    });
  });
});
if (swatches[0]) swatches[0].classList.add("active");

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
