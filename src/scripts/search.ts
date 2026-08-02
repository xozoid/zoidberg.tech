const searchInput = document.querySelector<HTMLInputElement>("#search-query");
const clearButton = document.querySelector<HTMLElement>("#search-clear");
const resultSections =
  document.querySelectorAll<HTMLElement>("[id^='results-']");
const searchItems = [
  ...document.querySelectorAll<HTMLElement>("[data-search-item]"),
];

function updateSearchResults() {
  if (!searchInput) return;

  const query = searchInput.value.trim().toLowerCase();
  const matches: Array<{ title: string; type: string | undefined }> = [];

  for (const item of searchItems) {
    const searchableText = [
      item.querySelector("h3")?.textContent,
      item.querySelector("p")?.textContent,
      item.dataset.searchTags,
    ]
      .join(" ")
      .toLowerCase();
    const isMatch = query.length > 0 && searchableText.includes(query);

    item.hidden = !isMatch;
    if (isMatch) {
      matches.push({
        title: item.querySelector("h3")?.textContent ?? "(untitled)",
        type: item.dataset.searchType,
      });
    }
  }

  for (const section of resultSections) {
    const visibleItemCount = [
      ...section.querySelectorAll<HTMLElement>("[data-search-item]"),
    ].filter((item) => !item.hidden).length;

    section.hidden = visibleItemCount === 0;
  }

  console.log("[search] results updated", {
    query,
    matches,
    sections: [...resultSections].map((section) => ({
      id: section.id,
      hidden: section.hidden,
      visibleItemCount: [
        ...section.querySelectorAll<HTMLElement>("[data-search-item]"),
      ].filter((item) => !item.hidden).length,
    })),
  });
}

if (searchInput) {
  const initialQuery = new URLSearchParams(window.location.search).get("q");
  let settleTimeoutId: number | undefined;

  if (initialQuery) searchInput.value = initialQuery;
  console.log("[search] initialized", {
    initialQuery,
    itemCount: searchItems.length,
    sectionCount: resultSections.length,
  });
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
