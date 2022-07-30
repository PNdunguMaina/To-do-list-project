const editTask = (taskContainer, task) => {
  const editArea = document.createElement('input');
  editArea.classList.add('edit-area');
  editArea.setAttribute('type', 'text');
  editArea.setAttribute('value', task.textContent);
  taskContainer.replaceChild(editArea, task);
  editArea.value = 'replaced task';
  taskContainer.replaceChild(task, editArea);
  task.textContent = editArea.value;
};

describe('testing edit function', () => {
  test('properly edit the task', () => {
    document.body.innerHTML = `
    <div id="tasks-container">
    <div id="task" class="task"><small></small></div>
    </div>`;
    const itemList = document.querySelector('#task');
    let text = document.querySelector('#task small');
    const newTask = 'replaced task';
    editTask(itemList, text);

    expect(text.innerHTML).toBe(newTask);
  });
});
