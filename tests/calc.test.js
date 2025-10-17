// script.test.js
import { add, divide, multiply, subtract } from "./script.js";

// Test addition
test("addition simple", () => {
  expect(add(2, 3)).toBe(5);
  expect(add(-1, 1)).toBe(0);
});

// Test soustraction
test("soustraction simple", () => {
  expect(subtract(5, 3)).toBe(2);
  expect(subtract(0, 4)).toBe(-4);
});

// Test multiplication
test("multiplication simple", () => {
  expect(multiply(4, 3)).toBe(12);
  expect(multiply(-2, 5)).toBe(-10);
});

// Test division
test("division simple", () => {
  expect(divide(10, 2)).toBe(5);
  expect(divide(-6, 3)).toBe(-2);
});

// Test division par zéro
test("division par zéro", () => {
  expect(() => divide(5, 0)).toThrow("Division par zéro !");
});
