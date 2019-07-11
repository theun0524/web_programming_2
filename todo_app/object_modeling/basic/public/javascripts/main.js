
// QuerySelector utility function
const qs = (selector, scope) => {
  return (scope || document).querySelector(selector);
};

// Storage for todo list
let store = [];

// create todo item
const createItem = title => {
  if (title.trim() === '') {
    return;
  }

  store.push({ 
    id: new Date().getTime(),
    title: title.trim(),
    completed: false,
  });
}

// find todo item
const findItem = id => store.find(item => item.id === id);

// remove todo item
const removeItem = id => {
  const index = store.findIndex(item => item.id === id);
  if (index >= 0) {
    store.splice(index, 1);
  }
};

// update todo item
const updateItem = (id, data) => {
  const todo = findItem(id);
  if (!todo) return;

  Object.assign(todo, data);
};

// toggle all todo list
const toggleAll = completed => {
  for (todo of store) {
    todo.completed = completed;
  }
};

// enter edit mode
const enterEditMode = (id, title) => {
  const item = qs(`[data-id="${id}"]`);
  if (!item) return;

  item.classList.add('editing');
  const input = document.createElement('input');
  input.className = 'edit';

  item.appendChild(input);
  input.focus();
  input.value = title;
};

// exit edit mode
const exitEditMode = (id, title) => {
  const item = qs(`[data-id="${id}"]`);
  if (!item) return;

  const input = qs('input.edit', item);
  item.removeChild(input);
  item.classList.remove('editing');

  if (title) {
    qs('label', item).textContent = title;
    updateItem(id, { title: title });
  }
};

// toggle item completed
const toggleComplete = (id, completed) => {
  const item = qs(`li[data-id="${id}"]`);
  if (completed) {
    item.classList.add('completed');
    qs('.toggle', item).setAttribute('checked', '');
  } else {
    item.classList.remove('completed');
    qs('.toggle', item).removeAttribute('checked');
  }
};

const updateCount = () => {
  const count = store.filter(item => !item.completed).length;
  qs('.todo-count').innerHTML = `<strong>${count}</strong> items left`;
};

const updateFilterState = state => {
  qs('.filters .selected').className = '';
  qs(`.filters [href="#/${state}"]`).className = 'selected';
};

// display todo items
const render = () => {
  const route = document.location.hash.split('/')[1] || '';

  // Remove old items
  const todoList = qs('.todo-list');
  todoList.innerHTML = '';

  // Update filtered items
  for (todo of store) {
    if (
      (route === '') ||
      (route === 'active' && !todo.completed) ||
      (route === 'completed' && todo.completed)
    ) {
      // add item to todo list
      const item = document.createElement('li');
      item.setAttribute('data-id', todo.id);
      todoList.appendChild(item);

      // add view element to todo item
      item.innerHTML = 
        '<div class="view">' +
          '<input type="checkbox" class="toggle">' +
          `<label>${todo.title}</label>` +
          '<button class="destroy"></button>' + 
        '</div>';

      toggleComplete(todo.id, todo.completed);

      qs('.toggle', item).addEventListener('change', e => {
        const id = Number(e.target.closest('li').dataset.id);
        toggleComplete(id, e.target.checked);
        updateItem(id, { completed: e.target.checked });
        updateCount();
      });
      qs('.destroy', item).addEventListener('click', e => {
        const id = Number(e.target.closest('li').dataset.id);
        removeItem(id);
        render();
      });
      qs('label', item).addEventListener('dblclick', e => {
        const id = Number(e.target.closest('li').dataset.id);
        enterEditMode(id, e.target.textContent);
      });
    }
  }

  // Update count
  updateCount();

  // Update filter state
  updateFilterState(route);
}

// Register event handlers
qs('.new-todo').addEventListener('change', e => {
  createItem(e.target.value);
  e.target.value = '';
  render();
});

qs('.toggle-all').addEventListener('change', e => {
  toggleAll(e.target.checked);
  render();  
});

qs('.clear-completed').addEventListener('click', () => {
  store = store.filter(item => !item.completed);
  render();
});

// Register edit mode event handlers
qs('.todo-list').addEventListener('blur', e => {
  if (!e.target.matches('input.edit')) {
    return;
  }

  const id = Number(e.target.closest('li').dataset.id);

  if (!e.target.dataset.iscanceled) {
    exitEditMode(id, e.target.value);
  } else {
    exitEditMode(id);
  }
}, true);

qs('.todo-list').addEventListener('keyup', e => {
  if (e.code === 'Enter') {
    e.target.blur();
  } else if (e.code === 'Escape') {
    e.target.dataset.iscanceled = true;
    e.target.blur();
  }
});

// Register hashchange event handler
window.addEventListener('hashchange', render);

render();
