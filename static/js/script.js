const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => observer.observe(el));

const membershipForm = document.getElementById("membership-form");
const membershipNote = document.getElementById("membership-note");

if (membershipForm) {
  membershipForm.addEventListener("submit", (event) => {
    event.preventDefault();
    membershipNote.textContent = "Merci. Votre demande d'accès a bien été enregistrée.";
    membershipForm.reset();
  });
}
