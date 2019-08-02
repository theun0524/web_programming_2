// QuerySelector utility function
const qs = (selector, scope) => {
  return (scope || document).querySelector(selector);
};

// true if query is undefined or matched to item
const match = (query, item) => {
  return !query || Object.keys(query).every(k => item[k] === query[k]);
}

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
    saveItem({ title: title }, id);
  }
};

const updateComplete = (id, completed) => {
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
  const count = findItem({ completed: false }).length;
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
  const data = findItem();
  for (todo of data) {
    if (
      (route === '') ||
      (route === 'active' && !todo.completed) ||
      (route === 'completed' && todo.completed)
    ) {
      // add item to todo list
      const item = document.createElement('li');
      item.setAttribute('data-id', todo._id);
      todoList.appendChild(item);

      // add view element to todo item
      item.innerHTML = 
        '<div class="view">' +
          '<input type="checkbox" class="toggle">' +
          `<label>${todo.title}</label>` +
          '<button class="destroy"></button>' + 
        '</div>';

      updateComplete(todo._id, todo.completed);
    }
  }

  // Update count
  updateCount();

  // Update filter state
  updateFilterState(route);
}

// Register event handlers
qs('.new-todo').addEventListener('change', e => {
  saveItem({ 
    title: e.target.value.trim(),
    completed: false,
  });
  e.target.value = '';
  render();
});

qs('.toggle-all').addEventListener('change', e => {
  const data = findItem();
  data.forEach(item => {
    saveItem({ completed: e.target.checked }, item._id);
  });
  render();  
});

qs('.clear-completed').addEventListener('click', () => {
  const data = findItem({ completed: true });
  data.forEach(item => {
    removeItem(item._id);
  });
  render();
});

// Register edit mode event handlers
qs('.todo-list').addEventListener('blur', e => {
  if (!e.target.matches('input.edit')) {
    return;
  }

  const id = e.target.closest('li').dataset.id;

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

qs('.todo-list').addEventListener('change', e => {
  const id = e.target.closest('li').dataset.id;
  if (id && e.target.matches('.toggle')) {
    updateComplete(id, e.target.checked);
    saveItem({ completed: e.target.checked }, id);
    updateCount();
  }
});
qs('.todo-list').addEventListener('click', e => {
  const id = e.target.closest('li').dataset.id;
  if (id && e.target.matches('.destroy')) {
    removeItem(id);
    render();
  }
});
qs('.todo-list').addEventListener('dblclick', e => {
  const id = e.target.closest('li').dataset.id;
  if (id && e.target.matches('label')) {
    enterEditMode(id, e.target.textContent);
  }
});

// Register hashchange event handler
window.addEventListener('hashchange', render);

render();
