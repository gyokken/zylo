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

  const countUp = (h3, dataTarget, unitLabel) => {
    let current = 0;
    const isDecimal = dataTarget % 1 !== 0;
    const steps = 20;
    const increment = dataTarget / steps;
    let stepCount = 0;

    const update = () => {
      stepCount++;
      current += increment;

      let displayVal = isDecimal ? current.toFixed(1) : Math.floor(current);

      h3.textContent = displayVal;
      if (unitLabel) {
        const span = document.createElement("span");
        span.textContent = unitLabel;
        h3.appendChild(span);
      }

      if (stepCount < steps) {
        requestAnimationFrame(update);
      }
    };

    update();
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const h3 = entry.target;
          const target = parseFloat(h3.dataset.target);
          const unitSpan = h3.querySelector("span");
          const unitLabel = unitSpan ? unitSpan.textContent : "";
          if (unitSpan) unitSpan.remove();

          countUp(h3, target, unitLabel);
          observer.unobserve(h3);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((h3) => observer.observe(h3));
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
  const links = document.querySelectorAll(".nav-links a");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("active");
      navLinks.classList.remove("open");
    });
  });
}
