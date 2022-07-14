import './style.css';

const listedTasks = [
  {
    description: 'Attend Gym session',
    completed: true,
    index: 1,
  },
  {
    description: 'Watch a movie',
    completed: false,
    index: 2,
  },
  {
    description: 'Attend Microverse session',
    completed: false,
    index: 3,
  },
  {
    description: 'Go to business site',
    completed: false,
    index: 5,
  },
  {
    description: 'Read a book',
    completed: false,
    index: 6,
  },
];

const tasksContainer = document.getElementById('tasks-container');

const listContainer = document.createElement('ul');
tasksContainer.className = 'tasks';
tasksContainer.appendChild(listContainer);

function listedItems(task) {
  const taskList = document.createElement('li');
  taskList.className = 'task-list';
  taskList.innerHTML = `
  <input class="checkbox" type="checkbox" />
  <label class="list-label">${task.description} <i class="fa-solid fa-ellipsis-vertical fa-icon"></i></label>
  `;
  return listContainer.appendChild(taskList);
}
listedTasks.forEach(listedItems);
