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

requestAnimationFrame(() => {
  html.classList.add("theme-ready");
});

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

if (!prefersReducedMotion.matches && "IntersectionObserver" in window) {
  const revealTargets = document.querySelectorAll(
    [
      "#experience",
      "#experience > section",
      "#experience article > .flex.gap-3.mb-5",
      "#stack + article > div",
      "#collaborate",
      "body > section:last-of-type",
    ].join(","),
  );

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealTargets.forEach((target) => {
    target.classList.add("scroll-reveal");
    revealObserver.observe(target);
  });

  html.classList.add("motion-ready");
}
