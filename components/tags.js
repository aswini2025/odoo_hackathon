export function getTags(containerId) {
  const tagList = ["JavaScript", "React", "CSS", "Node", "API"];
  const container = document.getElementById(containerId);

  container.innerHTML = `<select id="tag-select" multiple>
    ${tagList.map(tag => `<option value="${tag}">${tag}</option>`).join('')}
  </select>`;

  document.getElementById("tag-select").addEventListener("change", e => {
    const selected = Array.from(e.target.selectedOptions).map(o => o.value);
    localStorage.setItem("selectedTags", JSON.stringify(selected));
  });
}