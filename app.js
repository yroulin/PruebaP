const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');

const tasks = [];

function render() {
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const item = document.createElement('li');
    item.className = `todo-item${task.completed ? ' completed' : ''}`;

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = task.text;

    const actions = document.createElement('div');
    actions.className = 'todo-actions';

    const completeButton = document.createElement('button');
    completeButton.className = 'icon-btn complete';
    completeButton.type = 'button';
    completeButton.textContent = task.completed ? '↺' : '✓';
    completeButton.title = task.completed ? 'Marcar pendiente' : 'Marcar completada';
    completeButton.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      render();
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'icon-btn delete';
    deleteButton.type = 'button';
    deleteButton.textContent = '✕';
    deleteButton.title = 'Eliminar tarea';
    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1);
      render();
    });

    actions.append(completeButton, deleteButton);
    item.append(text, actions);
    list.appendChild(item);
  });

  emptyState.hidden = tasks.length > 0;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  tasks.unshift({ text, completed: false });
  input.value = '';
  input.focus();
  render();
});

render();
