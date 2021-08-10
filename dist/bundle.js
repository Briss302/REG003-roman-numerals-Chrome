(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { parse}= require("./src/parse.js");
const { stringify } = require("./src/stringify.js");

module.exports = {
  parse,
  stringify,
};

},{"./src/parse.js":2,"./src/stringify.js":3}],2:[function(require,module,exports){
const characterToInteger = (value) => {
  switch (value) {
    case "I": //puede aparecer tres veces en un número
      return 1;
    case "V": 
      return 5;
    case "X": //puede aparecer tres veces en un número
      return 10;
    case "L": 
      return 50;
    case "C": //puede aparecer tres veces en un número
      return 100;
    case "D": 
      return 500;
    case "M": //puede aparecer tres veces en un número
      return 1000;
    default:
      return "Ingrese un valor";
  }
}

let letter;

const msgError = (value) => {
  let msg;
  switch (value) {
    case "V":
      msg = "V (5)";
    break
    case "L":
      msg = "L (50)";
    break
    case "D":
      msg = "D (500)";
    break
    default:
      break;
  }
  return msg; 
}


const validCharacter = (currentValue) => {
  const romanNum = ["I", "V", "X", "L", "C", "D", "M"];
  //Comprobar que todos los elementos de un arreglo cumplan una condición
  const verify = currentValue.every((value) => romanNum.includes(value));
  return verify
};

const verifyUniqueCharacter = (currentValue) => {
  const romanNum = ["V", "L", "D"];
  const findUniqueCharacter = romanNum.map(
    (roman) => currentValue.filter((i) => i === roman).length
  );
  const verify = findUniqueCharacter.every((n) => n < 2);

  findUniqueCharacter.filter((i, index) => {
    if (i >= 2) return letter = romanNum[index];
    return null;
  });

  return verify;
};

const validRepetion = (currentValue) => {
  const romanNum = ["I", "X", "C", "M"];
  const joinArr = currentValue.join("");

  if (joinArr != "MMMCMXCIX") {
    const findRepetionCharacter = romanNum.map(
      (roman) => currentValue.filter((i) => i === roman).length
    );

    const valid = findRepetionCharacter.every((n) => n < 4);

    findRepetionCharacter.filter((i, index) => {
      if (i >= 4) return (letter = romanNum[index]);
      return null;
    });

    return valid;
  } else {
    return 3999;
  }
};

const validSubstraction = (currentValue) => {
  const errRomanNum = ["VX", "VL", "VC", "VD", "VM", "LC", "LD", "LM", "DM"];
  const exist = errRomanNum.map((e) => currentValue.indexOf(e));
  const valid = exist.every((n) => n < 0);
  exist.filter((e, index) => {
    if (e >= 0) letter = errRomanNum[index].charAt(0);
    return null;
  });
  return valid
}

const validOrder = (currentValue) => {
  const errRomanNum = ['IIV', 'IIX', 'IL', 'IC', 'ID', 'IM', 'XXL', 'XXC', 'XD', 'XM', 'IVI', 'IXI'];
  const exist = errRomanNum.map((e) => currentValue.indexOf(e));
  const valid = exist.every((n) => n < 0);
  return valid;
}

const parse = (romano) => {

  if (typeof romano != "string") {
    throw new Error("Not a string");
  }

  const arrValue = romano.split("");

  if (!validCharacter(arrValue)) {
    throw new Error("Unknown roman numeral");
  }

  if (!verifyUniqueCharacter(arrValue)) {
    throw new Error(
      `Invalid repetition of number starting with 5: ${msgError(letter)}`
    );
  }

  if (!validRepetion(arrValue)) {
    throw new Error(`Too many repetitions of roman numeral ${letter}`);
  }

  if (!validSubstraction(romano)) {
    throw new Error(`Invalid substraction prefix ${letter}`);
  }

  if(!validOrder(romano)) {
    throw new Error("Invalid order");
  }


  let number = characterToInteger(romano.charAt(0));
  let anterior;
  let actual;

  for(let i = 1; i < romano.length; ++i){
    actual = characterToInteger(romano.charAt(i));
    anterior = characterToInteger(romano.charAt(i - 1));
    
    if(actual <= anterior) {
      number += actual;
    }else {
      number = number - anterior * 2 + actual;
    }
  }

  return number;
}

module.exports = {
  parse,
};
},{}],3:[function(require,module,exports){
const romanToIntMap = {
	I:  1,
	IV: 4,
	V:  5,
	IX: 9,
	X:  10,
	XL: 40,
	L:  50,
	XC: 90,
	C:  100,
	CD: 400,
	D:  500,
	CM: 900,
	M:  1000
};
const romanSymbols = Object.keys(romanToIntMap);


function stringify(value) {
  if (typeof value !== 'number') {
    throw new TypeError('Not a number');
  }

  if (value < 0 || value > 3999) {
    throw new RangeError('out of range');
  }

  let result = '';

  for (let i = romanSymbols.length - 1; i >= 0; i--) {
    let symbol = romanSymbols[i];
    let roman = romanToIntMap[symbol];

    while (value >= roman) {
      result += symbol;
      value -= roman;
    }
  }
  
  return result;

};

module.exports = {
  stringify,
};

},{}],4:[function(require,module,exports){
const { parse, stringify } = require("roman-numerals");

const getValueRoman = document.getElementById("roman");
const getValueArabigo = document.getElementById("arabigo");

const btnRoman = document.getElementById("btn-roman");
const btnArabigo = document.getElementById("btn-arabigo");

const resultArabigo = (value) => {
  try {
    return parse(value);
  } catch (error) {
    return error.message;
  }
};

const resultRoman = (value) => {
  if(isNaN(value)) return "ingrese un número" 
  try {
    return stringify(value);
  } catch (error) {
    return error.message;
  }
};

btnRoman.addEventListener("click", function (e) {
  e.preventDefault();
  const showResult = document.getElementById("resArabigo");
  const getResult = resultArabigo(getValueRoman.value);
  showResult.innerHTML = getResult;
});

btnArabigo.addEventListener("click", function (e) {
  e.preventDefault();
  const showResult = document.getElementById("resRoman");
  const getResult = resultRoman((+getValueArabigo.value));
  showResult.innerHTML = getResult;
});

},{"roman-numerals":1}]},{},[4]);
