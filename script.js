const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');
const typeSelect = document.getElementById('type');
const transactionList = document.getElementById('transaction-list');
const balanceEl = document.getElementById('balance');
const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');
const filterSelect = document.getElementById('filter');
const transactionForm = document.getElementById('transaction-form');

let transactions = [];

console.log(transactionForm, amountInput, transactionList);