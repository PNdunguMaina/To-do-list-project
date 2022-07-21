import obtainFromLocalStorage from './storedData';
import { addTask } from './toDo';
import { removeTask } from './addRemove';
// All references to HTML
const inputField = document.getElementById('add-list');
const listContainer = document.getElementById('tasks-container');
const clearBtn = document.getElementById('clear');

// event handler to display the to do task
inputField.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && inputField.value) {
    e.preventDefault();
    addTask(inputField.value);
    inputField.value = null;
  }
});

window.onload = obtainFromLocalStorage;

// update local storage for the completed tasks
const updateLocalStorage = () => {
  const localStore = JSON.parse(localStorage.getItem('toDoList'));
  const toDos = document.querySelectorAll('small');

  for (let i = 0; i < toDos.length; i++) {
    if (toDos[i].classList.contains('line-through')) {
      localStore[i].completed = true;
    } else {
      localStore[i].completed = false;
    }
  }

  localStorage.setItem('toDoList', JSON.stringify(localStore));
};

// clear all completed function
const clearAll = () => {
  const localStore = JSON.parse(localStorage.getItem('toDoList'));
  const taskContainer = document.querySelectorAll('.task-container');
  taskContainer.forEach((i) => {
    if (i.classList.contains('checked-box')) {
      removeTask(i);
    }
  });
  let count = 1;
  const localData = Array.from(localStore).filter((i) => i.completed === false);
  localData.map((i) => (i.index = count += 1));
  localStorage.setItem('toDoList', localData);
};

clearBtn.addEventListener('click', clearAll);

export { inputField, listContainer, clearBtn, updateLocalStorage };
