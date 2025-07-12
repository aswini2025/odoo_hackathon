import { getEditorContent, initEditor } from './editor.js';

window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  initEditor("answer-editor");

  document.getElementById("answer-form").addEventListener("submit", e => {
    e.preventDefault();
    const questions = JSON.parse(localStorage.getItem("questions"));
    const question = questions.find(q => q.id == id);

    const newAnswer = {
      text: getEditorContent(),
      author: localStorage.getItem("currentUser")
    };

    question.answers.push(newAnswer);
    localStorage.setItem("questions", JSON.stringify(questions));
    location.reload(); // to re-render
  });
};
