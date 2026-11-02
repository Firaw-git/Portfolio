const toggleBtn = document.querySelector("#theme-toggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark")
    ? "Light Mode"
    : "Dark Mode";
});
const namePattern = /^[\p{L}\s]+$/u;
const form = document.querySelector("#booking-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const serviceSelect = document.querySelector("#service");
const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const serviceError = document.querySelector("#service-error");
const formMessage = document.querySelector("#form-message");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let isValid = true;
  nameError.textContent = "";
  emailError.textContent = "";
  serviceError.textContent = "";
  formMessage.textContent = "";

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (name === "") {
    nameError.textContent = "Please enter your name.";
    isValid = false;
  } else if (name.length < 3) {
    nameError.textContent = "Name must be at least 3 characters.";
    isValid = false;
  } else if (!namePattern.test(name)) {
    nameError.textContent = "Name can only contain letters and spaces.";
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  if (serviceSelect.value === "") {
    serviceError.textContent = "Please choose a service.";
    isValid = false;
  }

  if (isValid) {
    formMessage.textContent = `Thanks, ${name}! We'll contact you soon.`;
    form.reset();
  }
});

const reviewsStatus = document.querySelector("#reviews-status");
const reviewsList = document.querySelector("#reviews-list");

async function loadReviews() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const users = await response.json();
    const firstFive = users.slice(0, 5);

    firstFive.forEach((user) => {
      const card = document.createElement("article");
      card.classList.add("review");

      const title = document.createElement("h3");
      title.textContent = user.name;

      const email = document.createElement("small");
      email.textContent = user.email;

      const text = document.createElement("p");
      text.textContent = `"${user.company.catchPhrase}"`;

      card.append(title, email, text);
      reviewsList.append(card);
    });

    reviewsStatus.textContent = "";
  } catch (error) {
    reviewsStatus.textContent = "Sorry, reviews could not be loaded.";
    console.error("Fetch failed:", error);
  }
}

loadReviews();