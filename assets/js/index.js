/* eslint-disable indent */
const taskList = document.querySelector('#task-list');
const getTasks = document.querySelector('#retrieve');
const addTask = document.querySelector('#task-button');
const taskContainer = document.querySelector('#get-task');

//~~~ Would greatly appreciate more understanding on how we're supposed
//to connect to the database from the frontend via index.js ~~~
getTasks.addEventListener('click', async () => {
  fetch('/secret')
  .then((res) => res.json())
  .then((data) => {
    taskContainer.innerText = '';

    data.forEach(task => {
      const listItem = document.createElement('li');
      listItem.textContent = JSON.stringify(task);
      taskList.appendChild(listItem);
    });
  })
  .catch((err) => console.log('An error occurred: ', err));
});

addTask.addEventListener('click', async () => {
  fetch('/secret')
  .then((res) => res.json())
  .then((data) => {
    //unable to figure out how to populate DB via index.js using vanilla DOM manipulation
  })
  .catch((err) => console.log('An error occurred: ', err));
});