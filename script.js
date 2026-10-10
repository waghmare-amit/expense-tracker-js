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

transactionForm.addEventListener('submit', function (event){
    event.preventDefault();

    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const category = categorySelect.value;
    const type = typeSelect.value;

    const transaction = {
        id: Date.now(),
        description,
        amount,
        category, 
        type
    };

    transactions.push(transaction);

    transactionForm.reset();
    
});