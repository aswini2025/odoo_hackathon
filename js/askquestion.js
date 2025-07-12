import { getTags } from '../components/tags.js';
import { initEditor, getEditorContent } from './editor.js';

window.onload = () => {
  initEditor('editor-container');
  getTags('tag-selector');

  document.getElementById('ask-form').addEventListener('submit', e => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = getEditorContent();
    const tags = JSON.parse(localStorage.getItem('selectedTags') || '[]');

    const questions = JSON.parse(localStorage.getItem('questions') || '[]');
    questions.push({
      id: Date.now(),
      title,
      description,
      tags,
      answers: [],
      author: localStorage.getItem('currentUser')
    });
    localStorage.setItem('questions', JSON.stringify(questions));

    window.location.href = 'index.html';
  });
};
