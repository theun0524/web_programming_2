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

  save = (data, id) => {
    const todos = JSON.parse(localStorage.getItem(this._dbName));

    if (id) {
      const index = todos.findIndex(item => item.id === id);
      if (index < 0) return null;

      Object.assign(todos[index], data);
      localStorage.setItem(this._dbName, JSON.stringify(todos));
      return todos[index];
    } else {
      data.id = new Date().getTime();
      todos.push(data);
      localStorage.setItem(this._dbName, JSON.stringify(todos));
      return data;
    }
  };

  remove = id => {
    const todos = JSON.parse(localStorage.getItem(this._dbName));
    const index = todos.findIndex(item => item.id === id);
    if (index < 0) return;

    todos.splice(index, 1);
    localStorage.setItem(this._dbName, JSON.stringify(todos));
  };
}
