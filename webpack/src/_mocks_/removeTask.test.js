/* eslint-disable no-undef */
const removeTask = (task) => {
  const listContainer = document.getElementById('tasks-container');
  listContainer.removeChild(task);
  let count = 0;
  const localStore = JSON.parse(localStorage.getItem('toDoList'));
  const localData = Array.from(localStore).filter((i) => {
    i.completed === false;
  });
  localData.map((i) => {
    i.index = count + 1;
  });
  localStorage.setItem('toDoList', JSON.stringify(localData));
};

const myTasksArr = [
  {
    Description: 'Go to gym',
    completed: false,
    index: 1,
  },
  {
    Description: 'Attend Microverse morning session',
    completed: false,
    index: 2,
  },
  {
    Description: 'Go to lunch',
    completed: false,
    index: 3,
  },
  {
    Description: 'Make friends',
    completed: true,
    index: 4,
  },
];

localStorage.setItem('toDoList', JSON.stringify(myTasksArr));
document.body.innerHTML = `
    <div id="tasks-container">
    <div id="task" class="task"></div>
    </div>`;

describe('test removing items function', () => {
  const itemList = document.querySelector('#task');
  let items = document.querySelectorAll('#tasks-container .task');
  const itemsLength = items.length - 1;

  removeTask(itemList);
  items = document.querySelectorAll('#tasks-container .task');
  const localData = JSON.parse(localStorage.getItem('toDoList'));
  test('properly remove the correct task', () => {
    expect(items).toHaveLength(itemsLength);
  });

  test('properly remove the correct task from  local storage', () => {
    expect(localData).toHaveLength(itemsLength);
  });
});
