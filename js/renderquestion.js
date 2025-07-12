export function renderQuestion(id) {
  const questions = JSON.parse(localStorage.getItem("questions") || "[]");
  const question = questions.find(q => q.id == id);
  if (!question) return;

  document.getElementById("question-details").innerHTML = `
    <h2>${question.title}</h2>
    <div>${question.description}</div>
    <div>${question.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
  `;

  const container = document.getElementById("answers-container");
  container.innerHTML = question.answers.map(ans => `
    <div class="answer">
      <div>${ans.text}</div>
      <div class="answer-author">– ${ans.author}</div>
    </div>
  `).join('');
}

const id = new URLSearchParams(window.location.search).get("id");
if (id) renderQuestion(id);