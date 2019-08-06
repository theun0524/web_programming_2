class Store {
  constructor(name) {
    this._dbName = name;

    if (!localStorage.getItem(name)) {
      const store = [];
      localStorage.setItem(name, JSON.stringify(store));
    }
  }

  find = query => {
    const store = JSON.parse(localStorage.getItem(this._dbName));
    return store.filter(item => match(query, item));
  };

  save = async (data, id) => {
    const store = JSON.parse(localStorage.getItem(this._dbName));
    const options = {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    if (id) {
      const index = store.findIndex(item => item._id === id);
      if (index < 0) return null;

      try {
        data = await fetch(`/todos/${id}`, options);
      } catch (e) {
        console.warn('update failed:', e.message);
      }
      Object.assign(store[index], data);
    } else {
      try {
        const response = await fetch('/todos', options);
        data = await response.json();
      } catch (e) {
        console.warn('create failed:', e.message);
        data._id = String(new Date().getTime());
      }
      store.push(data);
    }
    localStorage.setItem(this._dbName, JSON.stringify(store));
    return data;
  };

  remove = async id => {
    const store = JSON.parse(localStorage.getItem(this._dbName));
    const index = store.findIndex(item => item._id === id);
    if (index >= 0) {
      store.splice(index, 1);
      localStorage.setItem(this._dbName, JSON.stringify(store));
      try {
        await fetch(`/todos/${id}`, { method: 'DELETE' });
      } catch (e) {
        console.warn('delete failed:', e.message);
      }
    }
  };

  initialize = async () => {
    try {
      const response = await fetch('/todos');
      const store = await response.json();
      localStorage.setItem(this._dbName, JSON.stringify(store));
    } catch (e) {
      console.warn('fetch failed:', e.message);
    }
  }
}
