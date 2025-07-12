import { getTags } from '../components/tags.js';
import { initEditor, getEditorContent } from './editor.js';

window.onload = () => {
  initEditor("editor-container");
  getTags("tag-selector");

  document.getElementById("ask-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = getEditorContent();
    const tags = JSON.parse(localStorage.getItem("selectedTags") || "[]");

    if (!title || description.trim() === '<p><br></p>' || tags.length === 0) {
      showToast("Please fill all fields!", "error");
      return;
    }

    const questions = JSON.parse(localStorage.getItem("questions") || "[]");
    questions.push({
      id: Date.now(),
      title,
      description,
      tags,
      answers: [],
      author: localStorage.getItem("currentUser") || "Guest"
    });

    localStorage.setItem("questions", JSON.stringify(questions));
    showToast("Question posted successfully!");
    setTimeout(() => window.location.href = "index.html", 1500);
  });
};

// Toast + Theme toggle logic (include this if not globally injected)
window.showToast = function(message = "Success!", type = "success") {
  const toast = document.getElementById("toast-msg");
  toast.innerText = message;
  toast.style.backgroundColor = type === "error" ? "#f44336" : "#4CAF50";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
};

const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.onclick = () => {
  document.body.classList.toggle("dark");
  toggleBtn.innerText = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
};

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggleBtn.innerText = "☀️ Light Mode";
}