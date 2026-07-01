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

// ─── COLLECTION FILTERS ───
const filterButtons = document.querySelectorAll(".c-filter");
const productCards = document.querySelectorAll(".p-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.f;
    productCards.forEach((card) => {
      const match = filter === "all" || card.dataset.cat === filter;
      card.classList.toggle("hidden-cat", !match);
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
