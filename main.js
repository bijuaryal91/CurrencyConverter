const input = document.querySelector(".form-group input");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
const output = document.querySelector(".output label");

window.onload = () => {
  fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
    .then(response => response.json())
    .then(data => {
      Object.keys(data.rates).forEach(currency => {
        const option = document.createElement("option");
        option.value = currency;
        option.text = currency;
        from.add(option.cloneNode(true));
        to.add(option);
      });
    });
};

const fetchData = () => {
  const inputData = parseFloat(input.value);
  fetch(`https://api.exchangerate-api.com/v4/latest/${from.value}`)
    .then(response => response.json())
    .then(data => {
      output.textContent = isNaN(inputData) ? "Wrong Value" : (data.rates[to.value] * inputData).toFixed(2);
    });
};

const getOutput = () => {
  if (!isNaN(parseFloat(input.value))) {
    fetchData();
  } else {
    output.textContent = "--";
  }
};

input.onkeyup = getOutput;
from.onchange = getOutput;
to.onchange = getOutput;
