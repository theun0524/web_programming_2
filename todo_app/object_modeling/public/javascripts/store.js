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

  save = (data, id) => {
    const store = JSON.parse(localStorage.getItem(this._dbName));

    if (id) {
      const index = store.findIndex(item => item._id === id);
      if (index < 0) return null;

      Object.assign(store[index], data);
      localStorage.setItem(this._dbName, JSON.stringify(store));
      return store[index];
    } else {
      data._id = String(new Date().getTime());
      store.push(data);
      localStorage.setItem(this._dbName, JSON.stringify(store));
      return data;
    }
  };

  remove = id => {
    const store = JSON.parse(localStorage.getItem(this._dbName));
    const index = store.findIndex(item => item._id === id);
    if (index >= 0) {
      store.splice(index, 1);
      localStorage.setItem(this._dbName, JSON.stringify(store));
    }
  };
}
