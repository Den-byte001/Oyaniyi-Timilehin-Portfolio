const html = document.documentElement;

const lightBtn = document.getElementById("lightBtn");
const systemBtn = document.getElementById("systemBtn");
const darkBtn = document.getElementById("darkBtn");
const systemPreference = window.matchMedia("(prefers-color-scheme: dark)");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

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

function transitionTheme(theme, button) {
  if (prefersReducedMotion.matches) {
    applyTheme(theme);
    return;
  }

  const bounds = button.getBoundingClientRect();
  const originX = bounds.left + bounds.width / 2;
  const originY = bounds.top + bounds.height / 2;
  const radius = Math.max(
    Math.hypot(originX, originY),
    Math.hypot(window.innerWidth - originX, originY),
    Math.hypot(originX, window.innerHeight - originY),
    Math.hypot(window.innerWidth - originX, window.innerHeight - originY),
  );

  html.style.setProperty("--theme-origin-x", `${originX}px`);
  html.style.setProperty("--theme-origin-y", `${originY}px`);
  html.style.setProperty("--theme-reveal-radius", `${radius}px`);

  if (typeof document.startViewTransition !== "function") {
    const nextThemeIsDark =
      theme === "dark" || (theme === "system" && systemPreference.matches);
    html.style.setProperty(
      "--theme-overlay-color",
      nextThemeIsDark ? "#000" : "#fff",
    );
    html.classList.add("theme-fallback-transition");
    window.setTimeout(() => applyTheme(theme), 450);
    window.setTimeout(
      () => html.classList.remove("theme-fallback-transition"),
      680,
    );
    return;
  }

  html.classList.add("theme-transition");

  const transition = document.startViewTransition(() => applyTheme(theme));
  transition.finished.then(
    () => html.classList.remove("theme-transition"),
    () => html.classList.remove("theme-transition"),
  );
}

lightBtn.addEventListener("click", () => {
  transitionTheme("light", lightBtn);
});

systemBtn.addEventListener("click", () => {
  transitionTheme("system", systemBtn);
});

darkBtn.addEventListener("click", () => {
  transitionTheme("dark", darkBtn);
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
