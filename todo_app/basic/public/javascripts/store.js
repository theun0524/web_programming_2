// Storage for todo list
const store = [];

// find todo item
const findItem = query => {
  return store.filter(item => match(query, item));
};

// create or update todo item
const saveItem = (data, id) => {
  if (id) {
    const index = store.findIndex(item => item._id === id);
    if (index < 0) return null;

    Object.assign(store[index], data);
    return store[index];
  } else {
    data._id = String(new Date().getTime());
    store.push(data);
    return data;
  }
};

// remove todo item
const removeItem = id => {
  const index = store.findIndex(item => item._id === id);
  if (index >= 0) {
    store.splice(index, 1);
  }
};
