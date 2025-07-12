window.onload = () => {
  const container = document.getElementById("question-list");
  const questions = JSON.parse(localStorage.getItem("questions") || "[]");

  if (questions.length === 0) {
    container.innerHTML = "<p>No questions posted yet.</p>";
    return;
  }

  container.innerHTML = questions.reverse().map(q => `
    <div class="question-preview">
      <h3>${q.title}</h3>
      <p>${q.description.slice(0, 100)}...</p>
      <div>${q.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <a class="view-link" href="question.html?id=${q.id}">💬 View / Answer</a>
    </div>
  `).join('');
};