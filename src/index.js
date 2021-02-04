const TODO_STATE = {
    CURRENT: 'CURRENT',
    DONE: 'DONE',
    DELETE: 'DELETE'
};

const STORAGE_KEYS = {
    TODOS: ''
};

function showTasks(){
    let getLocalStorageData = localStorage.getItem(STORAGE_KEYS.TODOS);
    if(getLocalStorageData == null){
        todos = [];
    }else{
        todos = JSON.parse(getLocalStorageData);
    }
}

//Табы
function tab() {
    let tabNav = document.querySelectorAll('.tabs-nav__item');
    let tabContent = document.querySelectorAll('.tab');
    let tabName;

    tabNav.forEach(item => {
        item.addEventListener('click', selectTabNav)
    });

    function selectTabNav() {
        tabNav.forEach(item => {
            item.classList.remove('is-active');
        });
        this.classList.add('is-active');
        tabName = this.getAttribute('data-tab-name');
        selectTabContent(tabName);
    }

    function selectTabContent(tabName) {
        tabContent.forEach(item => {
            item.classList.contains(tabName) ?
                item.classList.add('is-active') :
                item.classList.remove('is-active');
        })
    }
}

tab();

//Модальное окно
const addTasksBtn = document.querySelector('.add-tasks-btn');
const resetTaskBtn = document.querySelector('.form-btn__reset');
const submitTaskBtn = document.querySelector('.form-btn__submit');
let formTask = document.querySelector('.add-task__form');

function toggleModalHidden() {
    formTask.hidden = !formTask.hidden;
}

addTasksBtn.addEventListener('click', toggleModalHidden);
resetTaskBtn.addEventListener('click', toggleModalHidden);

//todos
const tableTasks = document.querySelector('.current-tasks');
const formName = document.getElementById('form-name');
const formDescription = document.getElementById('form-description');
const currentTasksContent = document.getElementById('template-current-tasks').content;
const taskTemplate = currentTasksContent.querySelector('.current-task');
let todos =[];
let priority = null;

formTask.addEventListener('submit', function (event) {
    event.preventDefault();

    renderTasks ();
    formTask.reset();
    toggleModalHidden();

    let todoCurrent = {
        id: Math.random(),
        name: formName.value,
        description: formDescription.value,
        priority: priority,
        state: TODO_STATE.CURRENT
    };

    todos.push(todoCurrent);
    saveToStorage(todos);
})

function createTaskElement() {
    const currentTask = taskTemplate.cloneNode(true);
    const formPriority = document.getElementsByName('form-priority');

    formPriority.forEach(item => {
        if(item.checked){
            priority = item.value;
        }
    })

    currentTask.querySelector('.current-task-name').textContent = formName.value;
    currentTask.querySelector('.current-task-description').textContent = formDescription.value;
    currentTask.querySelector('.current-task-priority').textContent = priority;

    return currentTask;
}

function renderTasks () {
    const task = createTaskElement();
    tableTasks.append(task);
}

function saveToStorage (arr) {
    const data = JSON.stringify(arr);
    localStorage.setItem(STORAGE_KEYS.TODOS, data);
}

//выполненные
const doTasksContent = document.getElementById('template-completed-tasks').content;
const doTaskTemplate = doTasksContent.querySelector('.completed-task');
const tableCompletedTasks = document.querySelector('.completed-tasks');
const btnDo = document.querySelector('.btn__do');

function deleteTask() {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
}

function doTaskElement () {
    const doTask = doTaskTemplate.cloneNode(true);
    doTask.querySelector('.completed-task-name').textContent = formName.value;
    doTask.querySelector('.completed-task-description').textContent = formDescription.value;
    doTask.querySelector('.completed-task-priority').textContent = priority;

    return doTask;
}

function renderDoTasks () {
    const task = doTaskElement();
    tableCompletedTasks.append(task);
}

btnDo.addEventListener('click', function (){
    deleteTask();
});








