const searchInput = document.querySelector<HTMLInputElement>("#search-query");
const clearButton = document.querySelector<HTMLElement>("#search-clear");
const resultSections =
  document.querySelectorAll<HTMLElement>("[id^='results-']");
const searchItems = [
  ...document.querySelectorAll<HTMLElement>("[data-search-item]"),
];

function getWords(text: string): string[] {
  return text.toLocaleLowerCase().match(/[\p{L}\p{N}+#]+/gu) ?? [];
}

function updateSearchResults() {
  if (!searchInput) return;

  const queryWords = getWords(searchInput.value);
  for (const item of searchItems) {
    const searchableText = [
      item.querySelector("h3")?.textContent,
      item.querySelector("p")?.textContent,
      item.dataset.searchAllTags,
    ].join(" ");
    const sourceWords = new Set(getWords(searchableText));
    const isMatch = queryWords.some(
      (word) =>
        sourceWords.has(word) ||
        (word.length >= 3 &&
          [...sourceWords].some((source) => source.includes(word))),
    );

    item.hidden = !isMatch;
  }

  for (const section of resultSections) {
    const visibleItemCount = [
      ...section.querySelectorAll<HTMLElement>("[data-search-item]"),
    ].filter((item) => !item.hidden).length;

    section.hidden = visibleItemCount === 0;
  }
}

if (searchInput) {
  const initialQuery = new URLSearchParams(window.location.search).get("q");
  let settleTimeoutId: number | undefined;

  if (initialQuery) searchInput.value = initialQuery;
  updateSearchResults();

  searchInput.addEventListener("input", () => {
    window.clearTimeout(settleTimeoutId);
    settleTimeoutId = window.setTimeout(updateSearchResults, 250);
  });

  clearButton?.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input"));
    searchInput.focus();
  });
}
