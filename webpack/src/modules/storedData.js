import { myTasksArr } from './toDo';
import { listContainer } from './index';
import { removeTask, editTask } from './addRemove';
import { updateLocalStorage } from './index';
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

export default obtainFromLocalStorage;
