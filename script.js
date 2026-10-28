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

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function renderTransactions() {
    transactionList.innerHTML = '';

    const selectedCategory = filterSelect.value;

    let visibleTransactions = transactions;

    if (selectedCategory === 'all') {
        visibleTransactions = transactions;
    } else {
        visibleTransactions = transactions.filter(function (t) {
            return t.category === selectedCategory;
        });   
    }

    if (visibleTransactions.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No transactions found';
        li.classList.add('empty');
        transactionList.appendChild(li);
        return;
    }

    visibleTransactions.forEach(function (transaction) {
        const li = document.createElement('li');
        li.classList.add(transaction.type);

        const descriptionSpan = document.createElement('span');
        descriptionSpan.textContent = transaction.description;
        descriptionSpan.classList.add('description');
        li.appendChild(descriptionSpan);

        const amountSpan = document.createElement('span');
        amountSpan.textContent = `₹${transaction.amount}`;
        amountSpan.classList.add('amount');
        li.appendChild(amountSpan);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.dataset.id = transaction.id;
        li.appendChild(deleteBtn);
        
        transactionList.appendChild(li);
    });
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

function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
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
    
    saveTransactions();
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
        saveTransactions();
        renderTransactions();
        updateBalance();
    }
});

filterSelect.addEventListener('change', function () {
    renderTransactions();
});

renderTransactions();
updateBalance();