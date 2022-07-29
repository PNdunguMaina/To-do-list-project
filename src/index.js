import './style.css';
import ToDoTasks from './modules/mainClassContainer';
import { editTask } from './modules/addRemoveTasks';
import updateLocalStorage from './modules/getLocalStorage';

// All references to HTML
const inputField = document.getElementById('add-list');
const listContainer = document.getElementById('tasks-container');
const clearBtn = document.getElementById('clear');

// initialize our main array of objects
const myTasksArr = [];
// add to do tasks function
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
  // checkbox
  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((icon) => {
    icon.addEventListener('click', () => {
      icon.parentElement.classList.toggle('checked-box');
      icon.nextElementSibling.classList.toggle('line-through');
      icon.parentElement.lastElementChild.classList.toggle('trash-active');
      icon.parentElement.lastElementChild.previousElementSibling.classList.toggle(
        'ellipsis-inactive'
      );
      updateLocalStorage();
    });
  });

  const toDo = new ToDoTasks(task, false, checkbox.length);
  myTasksArr.push(toDo);
  localStorage.setItem('toDoList', JSON.stringify(myTasksArr));
  // edit task
  const editIcons = document.querySelectorAll('.fa-ellipsis-v');
  editIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
      icon.parentElement.classList.add('checked-box');
      editTask(taskContainer, icon.previousElementSibling);
    });
  });
  // remove task
  const removeBtn = document.querySelectorAll('.fa-trash');
  removeBtn.forEach((icon) => {
    icon.addEventListener('click', () => {
      removeTask(icon.parentElement);
    });
  });
};

// remove task function
const removeTask = (task) => {
  listContainer.removeChild(task);
  let count = 1;
  const localStore = JSON.parse(localStorage.getItem('toDoList'));
  const localData = Array.from(localStore).filter((i) => {
    i.completed === false;
  });
  localData.map((i) => {
    i.index = count + 1;
    localStorage.setItem('toDoList', localData);
  });
};

// event handler to display the to do task
inputField.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && inputField.value) {
    e.preventDefault();
    addTask(inputField.value);
    inputField.value = null;
  }
});

const obtainFromLocalStorage = () => {
  const storedData = JSON.parse(localStorage.getItem('toDoList'));
  storedData.map((i) => {
    myTasksArr.push(i);
    // create the task list dynamically
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');
    taskContainer.innerHTML += `
  <input type="checkbox" class="checkbox" />
  <small>${i.description}</small>
  <i class="fas fa-ellipsis-v"></i>
  <i class="fas fa-trash"></i>
  `;
    listContainer.appendChild(taskContainer);

    const editIcons = document.querySelectorAll('.fa-ellipsis-v');
    editIcons.forEach((icon) => {
      icon.addEventListener('click', () => {
        icon.parentElement.classList.add('checked-box');
        editTask(taskContainer, icon.previousElementSibling);
      });
    });
  });
  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((icon) => {
    icon.addEventListener('click', () => {
      icon.parentElement.classList.toggle('checked-box');
      icon.nextElementSibling.classList.toggle('line-through');
      icon.parentElement.lastElementChild.classList.toggle('trash-active');
      icon.parentElement.lastElementChild.previousElementSibling.classList.toggle(
        'ellipsis-inactive'
      );
      updateLocalStorage();
    });
  });

  const removeBtn = document.querySelectorAll('.fa-trash');
  removeBtn.forEach((icon) => {
    icon.addEventListener('click', () => {
      removeTask(icon.parentElement);
    });
  });

  localStorage.setItem('toDoList', JSON.stringify(myTasksArr));
};

window.onload = obtainFromLocalStorage;

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
