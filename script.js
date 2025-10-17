export function add(a, b) {
  return a + b;
}

export function divide(a, b) {
  if (b === 0) throw new Error("Division par zéro !");
  return a / b;
}

export function subtract(a, b) {
   return a - b; 
}

export function multiply(a, b) {
   return a * b; 
}

document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.getElementById("buttons");

  const symbols = [
    "7",
    "8",
    "9",
    "+",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "*",
    "0",
    "C",
    "=",
    "/",
  ];
  symbols.forEach((sym) => {
    const btn = document.createElement("button");
    btn.textContent = sym;
    buttons.appendChild(btn);
  });

  console.log("Calculatrice initialisée !");
});
