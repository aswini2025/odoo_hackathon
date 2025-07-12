export let quill;

export function initEditor(containerId) {
  quill = new Quill(`#${containerId}`, {
    theme: 'snow',
    modules: {
      toolbar: [
        ['bold', 'italic', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        [{ align: [] }],
        ['emoji']
      ]
    }
  });
}

export function getEditorContent() {
  return quill.root.innerHTML;
}
