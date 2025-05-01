document.addEventListener("DOMContentLoaded", () => {
  const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const contactForm = document.getElementById("contactForm");
  const newsletterForm = document.getElementById("newsletterForm");

  const fnameInput = document.getElementById("fname");
  const emailInput = document.getElementById("cta-email");
  const messageInput = document.getElementById("message");

  const newsletterEmailInput = document.getElementById("newsletter-email");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = fnameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }

      if (!validEmail(email)) {
        alert("Please enter a valid email.");
        return;
      }

      console.log("Contact form submitted:", { name, email, message });
      alert("Thanks for reaching out! :)");
      contactForm.reset();
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = newsletterEmailInput.value.trim();

      if (!validEmail(email)) {
        alert("Please enter a valid email.");
        return;
      }

      console.log("Newsletter form submitted:", { email });
      alert("Thanks for subscribing! :)");
      newsletterForm.reset();
    });
  }
});
