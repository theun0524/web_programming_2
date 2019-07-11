class Model {
  constructor(storage) {
    this.storage = storage;
  }

  // create item
  create = title => {
    if (title.trim() === '') {
      return;
    }

    this.storage.save({ 
      title: title.trim(),
      completed: false,
    });
  }

  // find item
  find = query => this.storage.find(query);

  // remove item
  remove = id => {
    this.storage.remove(id);
  };

  // update todo item
  update = (id, data) => {
    this.storage.save(data, id);
  };
}
