document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const mainNav = document.querySelector(".main-nav");
navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Prevent booking a date in the past
const dateInput = document.getElementById("date");
dateInput.min = new Date().toISOString().split("T")[0];

// Booking form — submits to Web3Forms, which emails the request to
// info@blacklotusrecording.com (see access_key setup note in index.html).
const form = document.getElementById("bookingForm");
const note = document.getElementById("formNote");
const submitBtn = form.querySelector("button[type=submit]");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  const firstName = formData.get("name").split(" ")[0];

  submitBtn.disabled = true;
  note.textContent = "Sending your request...";
  note.classList.remove("error");

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });
    const result = await response.json();

    if (result.success) {
      note.textContent = `Thanks, ${firstName} — your request has been emailed to us. We'll confirm availability within 24 hours.`;
      note.classList.remove("error");
      form.reset();
    } else {
      throw new Error(result.message || "Submission failed");
    }
  } catch (err) {
    note.textContent = `Sorry, something went wrong sending your request. Please email info@blacklotusrecording.com or call (818) 856-8089 directly.`;
    note.classList.add("error");
  } finally {
    submitBtn.disabled = false;
  }
});
