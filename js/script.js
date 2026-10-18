// alert("This page is still Under Maintinces");
(() => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const button = form.querySelector('button[type="submit"]');
  const fields = [...form.querySelectorAll("input, textarea")];
  let sending = false;

  const showStatus = (message, state) => {
    status.textContent = message;
    status.dataset.state = state;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;

    const data = new FormData(form);
    const originalLabel = button.textContent;
    const originalReadOnly = fields.map((field) => field.readOnly);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    sending = true;
    button.disabled = true;
    button.textContent = "Sending…";
    fields.forEach((field) => { field.readOnly = true; });
    showStatus("Sending your message…", "pending");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });

      if (response.ok) {
        form.reset();
        showStatus("Thanks! Your message has been sent.", "success");
      } else {
        const result = await response.json().catch(() => null);
        const errors = Array.isArray(result?.errors)
          ? result.errors.map((error) => error?.message)
              .filter((message) => typeof message === "string").join(" ")
          : "";
        showStatus(
          errors || "Your message could not be sent. Please try again in a moment.",
          "error"
        );
      }
    } catch (error) {
      showStatus(
        error.name === "AbortError"
          ? "The request timed out, so we couldn't confirm delivery. Your message is still here; please try again later."
          : "We couldn't confirm delivery. Check your connection and try again. Your message is still here.",
        "error"
      );
    } finally {
      clearTimeout(timeout);
      sending = false;
      button.disabled = false;
      button.textContent = originalLabel;
      fields.forEach((field, index) => { field.readOnly = originalReadOnly[index]; });
    }
  });
})();