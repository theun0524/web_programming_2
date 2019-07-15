function myFunction() {
  alert('hello');
}

function() {
  alert('hello');
}

var myButton = document.querySelector('button');
myButton.onclick = function() {
  alert('hello');
};

var myGreeting = function() {
  alert('hello');
};

myGreeting();

var anotherGreeting = function() {
  alert('hello');
};

myGreeting();
anotherGreeting();
