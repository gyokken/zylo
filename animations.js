document.addEventListener("DOMContentLoaded", () => {
  scrollURLUpdate();
  sectionFloatIn();
  statsCounter();
  serviceToggles();
  burgerMenu();
});

//URL hash
function scrollURLUpdate() {
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          history.replaceState(null, null, `#${sectionId}`);
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => observer.observe(section));
}

//Sections float in
function sectionFloatIn() {
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => observer.observe(section));
}

//Stats counter
function statsCounter() {
  const counters = document.querySelectorAll("#statistics h3[data-target]");

  const countUp = (el, target, suffixText) => {
    let current = 0;
    const isDecimal = target % 1 !== 0;
    const steps = 20;
    const increment = target / steps;
    let stepCount = 0;

    const update = () => {
      stepCount++;
      current += increment;

      let displayVal = isDecimal ? current.toFixed(1) : Math.floor(current);

      el.textContent = displayVal;

      if (suffixText) {
        const span = document.createElement("span");
        span.textContent = suffixText;
        el.appendChild(span);
      }

      if (stepCount < steps) {
        requestAnimationFrame(update);
      }
    };

    update();
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.target);
          const span = el.querySelector("span");
          const suffixText = span ? span.textContent : "";
          if (span) span.remove();

          countUp(el, target, suffixText);
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

//Service toggles
function serviceToggles() {
  document.querySelectorAll(".service-toggle").forEach((serviceToggle) => {
    serviceToggle.addEventListener("click", () => {
      const service = serviceToggle.closest(".service");
      service.classList.toggle("open");
    });
  });
}

//Burger menu
function burgerMenu() {
  const burger = document.getElementById("burger");
  const navLinks = document.querySelector(".nav-links");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navLinks.classList.toggle("open");
  });
}
