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

export default updateLocalStorage;
