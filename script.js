const html = document.documentElement;

const lightBtn = document.getElementById("lightBtn");
const systemBtn = document.getElementById("systemBtn");
const darkBtn = document.getElementById("darkBtn");

function applyTheme(theme) {
  if (theme === "dark") {
    html.classList.add("dark");
  }

  if (theme === "light") {
    html.classList.remove("dark");
  }

  if (theme === "system") {
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    html.classList.toggle("dark", systemDark);
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

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "system";

applyTheme(savedTheme);
