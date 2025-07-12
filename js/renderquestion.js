export function renderQuestion(id) {
  const questions = JSON.parse(localStorage.getItem('questions') || '[]');
  const question = questions.find(q => q.id == id);
  if (!question) return;

  document.getElementById('question-details').innerHTML = `
    <h2>${question.title}</h2>
    <div>${question.description}</div>
    <div>${question.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}</div>
  `;

  renderAnswers(question.answers);
}

function renderAnswers(answers) {
  const container = document.getElementById('answers-container');
  container.innerHTML = answers.map(ans => `
    <div class="answer">
      <div>${ans.text}</div>
      <div>— ${ans.author}</div>
    </div>`).join('');
}
