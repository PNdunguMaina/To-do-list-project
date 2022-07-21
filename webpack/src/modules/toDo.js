import ToDoTasks from './main';
import { listContainer, updateLocalStorage } from './index';
import { removeTask, editTask } from './addRemove';
// initialize our main array of objects
export const myTasksArr = [];
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

export { addTask };
