// edit task function
const editTask = (taskContainer, task) => {
  const editArea = document.createElement('input');
  editArea.classList.add('edit-area');
  editArea.setAttribute('type', 'text');
  editArea.setAttribute('value', task.textContent);
  taskContainer.replaceChild(editArea, task);
  editArea.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const containers = document.querySelectorAll('.task-container');
      const localStore = JSON.parse(localStorage.getItem('toDoList'));
      for (let i = 0; i < containers.length; i++) {
        if (containers[i].classList.contains('checked-box')) {
          localStore[i].description = editArea.value;
          localStorage.setItem('toDoList', JSON.stringify(localStore));
        }
      }
      editArea.parentElement.classList.remove('checked-box');
      taskContainer.replaceChild(task, editArea);
      task.textContent = editArea.value;
    }
  });
};

export { editTask };
