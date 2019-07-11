// match query and item
// return true if query is null
const match = (query, item) => {
  return !query || Object.keys(query).every(k => item[k] === query[k]);
}

class Store {
  constructor(name) {
    this._dbName = name;

    if (!localStorage.getItem(name)) {
      const todos = [];
      localStorage.setItem(name, JSON.stringify(todos));
    }
  }

  find = query => {
    const todos = JSON.parse(localStorage.getItem(this._dbName));

    return todos.filter(item => match(query, item));
  };

  findAll = () => {
    return JSON.parse(localStorage.getItem(this._dbName));
  };

  save = async (data, id) => {
    const todos = JSON.parse(localStorage.getItem(this._dbName));

    if (id) {
      const index = todos.findIndex(item => item._id === id);
      if (index < 0) return null;

      Object.assign(todos[index], data);
      localStorage.setItem(this._dbName, JSON.stringify(todos));

      try {
        await fetch(
          `/todos/${id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          },
        );
      } catch (e) {
        console.warn('update failed:', e.message);
      }
      return todos[index];
    } else {
      try {
        const response = await fetch(
          '/todos',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          }
        );
        data = await response.json();
      } catch (e) {
        console.warn('create failed:', e.message);
        data._id = String(new Date().getTime());
      }
      todos.push(data);
      localStorage.setItem(this._dbName, JSON.stringify(todos));
      return data;
    }
  };

  remove = async id => {
    const todos = JSON.parse(localStorage.getItem(this._dbName));
    const index = todos.findIndex(item => item._id === id);
    if (index < 0) return;

    todos.splice(index, 1);
    localStorage.setItem(this._dbName, JSON.stringify(todos));

    try {
      await fetch(`/todos/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('delete failed:', e.message);
    }
  };

  initialize = async () => {
    try {
      const response = await fetch('/todos');
      const todos = await response.json();
      localStorage.setItem(this._dbName, JSON.stringify(todos));
    } catch (e) {
      console.warn('fetch failed:', e.message);
    }
  }
}
