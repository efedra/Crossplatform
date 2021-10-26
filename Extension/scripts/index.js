document.addEventListener('DOMContentLoaded', function () {
    const state = getStoredStateOrDefault({
        allTasks: 0,
        doneTasks: 0
    })

    const todoForm = document.querySelector('.todo-form');
// select the input box
    const todoInput = document.querySelector('.todo-input');
// select the <ul> with class="todo-items"
    const todoItemsList = document.querySelector('.todo-items');

// array which stores every todos
    let todos = [];

    if(state.allTasks==0){
        document.querySelector('.gauge').style.display = "none";
        document.querySelector('.background-nothing-done').style.display='block';
        document.querySelectorAll('.nothing-done').forEach(elem =>elem.style.display='inline');
        document.querySelector('.countTasks').style.display = "none";
    }

    const $gauge = document.querySelector('.gauge')
    setGaugePercent($gauge, Math.min((state.doneTasks / state.allTasks)))





// add an eventListener on form, and listen for submit event
    todoForm.addEventListener('submit', function (event) {
        // prevent the page from reloading when submitting the form
        event.preventDefault();
        addTodo(todoInput.value); // call addTodo function with input box current value
    });


// function to add todo
    function addTodo(item) {
        document.querySelector('.background-nothing-done').style.display='none';
        document.querySelectorAll('.nothing-done').forEach(elem =>elem.style.display='none');
        document.querySelector('.line').style.display='none'

        // if item is not empty
        if (item !== '') {
            // make a todo object, which has id, name, and completed properties
            const todo = {
                id: Date.now(),
                name: item,
                completed: false,
                pick:false
            };

            // then add it to todos array
            todos.push(todo);
            addToLocalStorage(todos); // then store it in localStorage

            // finally clear the input box value
            todoInput.value = '';

            state.allTasks += 1
            saveState(state)
            setGaugePercent($gauge, Math.min((state.doneTasks / state.allTasks), 100))

            renderTodos(todos);
        }

    }

// function to render given todos to screen
    function renderTodos(todos) {

        if(todos.length==0){
            document.querySelector('.gauge').style.display='none';
            document.querySelector('.background-nothing-done').style.display= "block";
            document.querySelectorAll('.nothing-done').forEach(elem =>elem.style.display='inline');
            document.querySelector('.line').style.display='block'
            document.querySelector('.countTasks').style.display = "none";
        }
        else if (todos.every(todo => todo.completed)) {
            document.querySelector('.gauge').style.display='none';
            document.querySelector('.background-all-done').style.display= "block";
            document.querySelectorAll('.all-done').forEach(elem =>elem.style.display='inline');
            document.querySelector('.todo-items').style.display='none';
            document.querySelector('.line').style.display='block';
            document.querySelector('.countTasks').style.display = "none";
        }
        else {
            document.querySelector('.gauge').style.display= "block";
            document.querySelector('.todo-items').style.display= "block";
            document.querySelector('.background-all-done').style.display='none';
            document.querySelectorAll('.all-done').forEach(elem =>elem.style.display='none');
            document.querySelector('.line').style.display='none'

            document.querySelector('.countTasks').style.display = "inline";

            const countTasks = document.querySelector('.countTasks')
            countTasks.innerHTML = state.allTasks - state.doneTasks + " tasks to do"
        }


        // clear everything inside <ul> with class=todo-items
        todoItemsList.innerHTML = '';

        // run through each item inside todos
        todos.forEach(function (item) {
            // check if the item is completed
            const checked = item.completed ? 'checked' : null;

            // make a <li> element and fill it
            // <li> </li>
            const li = document.createElement('li');
            // <li class="item"> </li>
            li.setAttribute('class', 'item');
            // <li class="item" data-key="20200708"> </li>
            li.setAttribute('data-key', item.id);

            /* <li class="item" data-key="20200708">
                  <input type="checkbox" class="checkbox">
                  Go to Gym
                  <button class="delete-button">X</button>
                </li> */
            // if item is completed, then add a class to <li> called 'checked', which will add line-through style
            if (item.completed === true) {
                li.classList.add('checked');
            }
            if(item.pick === true){
                li.classList.add('li-click')
            }

            li.innerHTML = `
            <label class="container-checkbox">
               <input  type="checkbox" class="checkbox" ${checked}>
               <span class="false-checkbox"></span> 
            </label>
            <div class="li-text" style="${item.completed ? 'text-decoration-line: line-through;  color: #A5A5A5;': ''}">${item.name}</div> 
            <button class="delete-button">X</button>
        `;
            // finally add the <li> to the <ul>
            todoItemsList.append(li);
        });

    }

// function to add todos to local storage
    function addToLocalStorage(todos) {
        // conver the array to string then store it.
        localStorage.setItem('todos', JSON.stringify(todos));
        // render them to screen
        renderTodos(todos);
    }

// function helps to get everything from local storage
    function getFromLocalStorage() {
        const reference = localStorage.getItem('todos');
        // if reference exists
        if (reference) {
            // converts back to array and store it in todos array
            todos = JSON.parse(reference);
            renderTodos(todos);
        }
    }


// toggle the value to completed and not completed
    function toggle(id) {
        todos.forEach(function (item) {
            // use == not ===, because here types are different. One is number and other is string
            if (item.id == id) {
                // toggle the value
                item.completed = !item.completed;
                if (item.completed) {
                    state.doneTasks += 1
                    saveState(state)
                    setGaugePercent($gauge, Math.min((state.doneTasks / state.allTasks), 100))
                } else {
                    state.doneTasks -= 1
                    saveState(state)
                    setGaugePercent($gauge, Math.max((state.doneTasks / state.allTasks), 0))
                }
            }
        });
        addToLocalStorage(todos);
    }

    function repick(id){
        todos.forEach(function (item) {
            // use == not ===, because here types are different. One is number and other is string
            if (item.id == id) {
                item.pick = !item.pick;
            }
        });
        addToLocalStorage(todos);
    }
// deletes a todo from todos array, then updates localstorage and renders updated list to screen
    function deleteTodo(id) {
        // filters out the <li> with the id and updates the todos array
        todos = todos.filter(function (item) {
            // use != not !==, because here types are different. One is number and other is string
            if (item.id == id) {
                state.allTasks -= 1;
                if (item.completed) state.doneTasks -= 1
            }
            saveState(state)
            setGaugePercent($gauge, Math.max((state.doneTasks / state.allTasks), 0))
            return item.id != id;
        });

        // update the localStorage
        addToLocalStorage(todos);
    }

// initially get everything from localStorage
    getFromLocalStorage();

// after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
    todoItemsList.addEventListener('click', function (event) {
        // check if the event is on checkbox
        if (event.target.classList.contains('false-checkbox')) {
            // toggle the state
            toggle(event.target.parentElement.parentElement.getAttribute('data-key'));
        }

        // check if that is a delete-button
        if (event.target.classList.contains('delete-button')) {
            // get id from data-key attribute's value of parent <li> where the delete-button is present
            deleteTodo(event.target.parentElement.getAttribute('data-key'));
        }
        repick(event.target.getAttribute('data-key'))


    });



    const newDay =document.querySelector('.new-day')

    newDay.addEventListener('click', function (event)
    {

        todos = todos.filter(function (item) {
            // use != not !==, because here types are different. One is number and other is string
            if (item.pick === false) {
                state.allTasks -= 1;
                if (item.completed) state.doneTasks -= 1
                saveState(state)
                setGaugePercent($gauge, Math.max((state.doneTasks / state.allTasks), 0))
                return false
            }
            saveState(state)
            setGaugePercent($gauge, Math.max((state.doneTasks / state.allTasks), 0))
            return true;
        });
        // update the localStorage
        addToLocalStorage(todos);

        if(state.doneTasks== state.allTasks){
            todos = todos.filter(function (item) {
                // use != not !==, because here types are different. One is number and other is string
                state.allTasks -= 1;
                if (item.completed) state.doneTasks -= 1
                saveState(state)
                setGaugePercent($gauge, Math.max((state.doneTasks / state.allTasks), 0))
                return false
            })
            document.querySelector('.background-all-done').style.display='none';
            document.querySelectorAll('.all-done').forEach(elem =>elem.style.display='none');
            addToLocalStorage(todos);

        }
    });

})
