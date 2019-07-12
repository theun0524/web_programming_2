var cheese = 'Cheddar';

if (cheese) {
  console.log('Yay! Cheese available for making cheese on toast.');
} else {
  console.log('No cheease on toast for you today.');
}

var shoppingDone = false;

if (shoppingDone) {
  var childsAllowance = 10;
} else {
  var childsAllowance = 5;
}

// nesting if ... else 
if (choice === 'sunny') {
  if (temperature < 86) {
    para.textContent = '날씨가 화창합니다.';
  } else if (temperature >= 86) {
    para.textContent = '외출하실 때 썬크림을 바르세요.';
  }
}

// logical operator : AND
if (choice === 'sunny' && temperature < 86) {
  para.textContent = '날씨가 화창합니다.';
} else if (choice === 'sunny' && temperature >= 86) {
  para.textContent = '외출하실 때 썬크림을 바르세요.';
}

// logical operator : OR
if (iceCreamVanOutside || houseStatus === 'on fire') {
  console.log('집에서 빨리 나오세요.');
} else {
  console.log('그냥 집에 계세요.');
}

// logical operator : NOT
if (!(iceCreamVanOutside || houseStatus === 'on fire')) {
  console.log('그냥 집에 계세요.');
} else {
  console.log('집에서 빨리 나오세요.');
}

// combine logical operator
if ((x === 5 || y > 3 || z <= 10) && (loggedIn || userName === 'Steve')) {
  // run the code
}

// incorrect logical operator
if (x === 5 || 7 || 10 || 20) {
  // run the code
}

// correct logical operator
if (x === 5 || x === 7 || x === 10 || x === 20) {
  // run the code
}
