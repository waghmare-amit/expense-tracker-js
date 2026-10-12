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

function renderTransactions() {
    transactionList.innerHTML = '';

    transactions.forEach(function (transaction) {
        const li = document.createElement('li');
        li.textContent = `${transaction.description} - ${transaction.amount}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.dataset.id = transaction.id;
        
        li.appendChild(deleteBtn);
        transactionList.appendChild(li);
    })
}

function updateBalance() {
    const incomes = transactions.filter(function (t) {
        return t.type === 'income';
    });

    const totalIncome = incomes.reduce(function (sum, item) {
        return sum + item.amount;
    }, 0);

    const expenses = transactions.filter(function (t) {
        return t.type === 'expense';
    });

    const totalExpense = expenses.reduce(function (sum, item) {
        return sum + item.amount;
    }, 0);

    const balance = totalIncome - totalExpense;
    balanceEl.textContent = `₹${balance}`;
    totalIncomeEl.textContent = `₹${totalIncome}`;
    totalExpenseEl.textContent = `₹${totalExpense}`;
}

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
    renderTransactions();
    updateBalance();

    transactionForm.reset();       
});

transactionList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
        const id = Number(event.target.dataset.id);
        transactions = transactions.filter(function (t) {
            return t.id !== id;
        });
        renderTransactions();
        updateBalance();
    }
});