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

// Booking form
const form = document.getElementById("bookingForm");
const note = document.getElementById("formNote");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = Object.fromEntries(new FormData(form).entries());

  note.textContent = `Thanks, ${data.name.split(" ")[0]} — your request for ${data.date} at ${data.time} has been received. We'll confirm by email shortly.`;
  note.classList.remove("error");
  form.reset();
});
