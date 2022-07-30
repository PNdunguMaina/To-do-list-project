document.body.innerHTML = `
    <div id="tasks-container">
    <div id="task" class="task"></div>
    </div>`;

const addTask = (task) => {
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('task-container');
  taskContainer.innerHTML += `
  <input type="checkbox" class="checkbox" />
  <small>${task}</small>
  <i class="fas fa-ellipsis-v"></i>
  <i class="fas fa-trash"></i>
  `;
  listContainer.appendChild(taskContainer);
};
const listContainer = document.getElementById('tasks-container');

describe('test adding items function', () => {
  test('properly adds task', () => {
    addTask('Go to gym');
    let items = document.querySelectorAll('#tasks-container .task');
    expect(items).toHaveLength(1);
  });
});
