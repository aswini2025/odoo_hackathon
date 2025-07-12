// vote.js
export function initVoting(questionId) {
  const questionList = JSON.parse(localStorage.getItem("questions") || "[]");
  const question = questionList.find(q => q.id == questionId);

  question.answers.forEach((ans, i) => {
    const btn = document.getElementById(`vote-btn-${i}`);
    btn.addEventListener("click", () => {
      ans.votes = (ans.votes || 0) + 1;
      localStorage.setItem("questions", JSON.stringify(questionList));
      document.getElementById(`vote-count-${i}`).innerText = ans.votes;
    });
  });

  // Accept answer
  document.querySelectorAll(".accept-btn").forEach((btn, i) => {
    btn.addEventListener("click", () => {
      question.answers.forEach(a => (a.accepted = false));
      question.answers[i].accepted = true;
      localStorage.setItem("questions", JSON.stringify(questionList));
      location.reload();
    });
  });
}
