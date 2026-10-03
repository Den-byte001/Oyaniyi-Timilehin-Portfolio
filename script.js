const html = document.documentElement;

const lightBtn = document.getElementById("lightBtn");
const systemBtn = document.getElementById("systemBtn");
const darkBtn = document.getElementById("darkBtn");
const systemPreference = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(theme) {
  if (theme === "dark") {
    html.classList.add("dark");
  }

  if (theme === "light") {
    html.classList.remove("dark");
  }

  if (theme === "system") {
    html.classList.toggle("dark", systemPreference.matches);
  }

  localStorage.setItem("theme", theme);
}

lightBtn.addEventListener("click", () => {
  applyTheme("light");
});

systemBtn.addEventListener("click", () => {
  applyTheme("system");
});

darkBtn.addEventListener("click", () => {
  applyTheme("dark");
});

systemPreference.addEventListener("change", (event) => {
  if (localStorage.getItem("theme") === "system") {
    html.classList.toggle("dark", event.matches);
  }
});

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "system";

applyTheme(savedTheme);
