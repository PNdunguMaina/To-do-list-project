/* eslint-disable no-undef */
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

describe ('clear all completed working properly', () => {
    test ('local storage updated accordingly', () => {

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
    const itemList = document.querySelector('#task');
    updateLocalStorage(itemList);
    const localData = JSON.parse(localStorage.getItem('toDoList'));
    expect (localData).toHaveLength(4);

})

}) 
    

