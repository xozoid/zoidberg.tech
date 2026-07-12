const themeCookie = "theme=light";

function hasLightThemeCookie() {
  return document.cookie.split("; ").includes(themeCookie);
}

function setLightThemeCookie() {
  document.cookie = `${themeCookie}; Max-Age=31536000; Path=/; SameSite=Lax`;
}

function clearLightThemeCookie() {
  document.cookie = "theme=; Max-Age=0; Path=/; SameSite=Lax";
}

function setThemeMode(mode: "dark" | "light") {
  const lightButton = document.getElementById("theme-light");
  const darkButton = document.getElementById("theme-dark");
  const isLight = mode === "light";

  document.documentElement.classList.toggle("light", isLight);
  lightButton?.classList.toggle("open", isLight);
  darkButton?.classList.toggle("open", !isLight);
  lightButton?.setAttribute("aria-pressed", String(isLight));
  darkButton?.setAttribute("aria-pressed", String(!isLight));

  if (isLight) setLightThemeCookie();
  else clearLightThemeCookie();
}

function initFooterTheme() {
  const lightButton = document.getElementById("theme-light");
  const darkButton = document.getElementById("theme-dark");

  setThemeMode(hasLightThemeCookie() ? "light" : "dark");

  lightButton?.addEventListener("click", () => {
    setThemeMode("light");
  });
  darkButton?.addEventListener("click", () => {
    setThemeMode("dark");
  });
}

initFooterTheme();
