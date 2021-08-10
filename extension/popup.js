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
