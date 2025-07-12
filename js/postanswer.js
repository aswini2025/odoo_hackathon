import { initEditor, getEditorContent } from './editor.js';

// ✅ Toast function defined locally
function showToast(message = "Success!", type = "success") {
  const toast = document.getElementById("toast-msg");
  toast.innerText = message;
  toast.style.backgroundColor = type === "error" ? "#f44336" : "#4CAF50";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

window.onload = () => {
  // 🌙 Theme toggle setup (optional if you already handle it globally)
  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.onclick = () => {
      document.body.classList.toggle("dark");
      toggleBtn.innerText = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
      localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    };

    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      toggleBtn.innerText = "☀️ Light Mode";
    }
  }

  // ✍️ Initialize Quill editor for answers
  initEditor("answer-editor");

  // 📨 Handle answer submission
  document.getElementById("answer-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const answerText = getEditorContent();

    if (!answerText || answerText.trim() === "<p><br></p>") {
      showToast("Answer cannot be empty!", "error");
      return;
    }

    const questionId = new URLSearchParams(window.location.search).get("id");
    const questions = JSON.parse(localStorage.getItem("questions") || "[]");
    const question = questions.find(q => q.id == questionId);

    if (!question) {
      showToast("Question not found!", "error");
      return;
    }

    question.answers.push({
      text: answerText,
      author: localStorage.getItem("currentUser") || "Guest",
      postedAt: new Date().toISOString()
    });

    localStorage.setItem("questions", JSON.stringify(questions));
    showToast("Answer posted!");

setTimeout(() => {
  window.location.href = "index.html";  // ✅ Redirects to homepage
}, 1000);
  });
};