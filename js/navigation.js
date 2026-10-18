(() => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.getElementById("primary-navigation");

  if (!toggle || !links) return;

  const nav = toggle.closest("nav");
  const mobile = window.matchMedia("(max-width: 540px)");

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close menu" : "Menu";
    links.classList.toggle("is-open", open);
  };

  toggle.hidden = false;
  nav.dataset.menuReady = "true";

  // Open or close the menu.
  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Close after choosing a navigation link.
  nav.addEventListener("click", (event) => {
    if (mobile.matches && event.target.closest("a")) {
      const wasOpen = toggle.getAttribute("aria-expanded") === "true";

      setOpen(false);

      if (wasOpen) {
        toggle.focus({ preventScroll: true });
      }
    }
  });

  // Support keyboard dismissal.
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      toggle.getAttribute("aria-expanded") === "true"
    ) {
      setOpen(false);
      toggle.focus({ preventScroll: true });
    }
  });

  // Close when clicking outside the navigation.
  document.addEventListener("click", (event) => {
    if (toggle.getAttribute("aria-expanded") !== "true") return;

    if (!nav.contains(event.target)) {
      if (links.contains(document.activeElement)) {
        toggle.focus({ preventScroll: true });
      }

      setOpen(false);
    }
  });

  // Reset when switching between mobile and desktop layouts.
  mobile.addEventListener("change", () => {
    setOpen(false);
  });
})();