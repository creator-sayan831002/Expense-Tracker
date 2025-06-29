// Arrays to store income and expense entries
let incomes = [];
let expenses = [];
let totalIncome = 0;
let totalExpense = 0;

// ----------- DOM ELEMENTS -----------

// Income input elements
const incomeDateInput = document.getElementById('income-date-input');
const incomeDescInput = document.getElementById('income-desc-input');
const incomeCategorySelect = document.getElementById('income-category-select');
const incomeAmountInput = document.getElementById('income-amount-input');
const addIncomeBtn = document.getElementById('add-income-btn');
const incomesTableBody = document.getElementById('income-table-body');
const totalIncomeCell = document.getElementById('total-income');

// Expense input elements
const expenseDateInput = document.getElementById('expense-date-input');
const expenseDescInput = document.getElementById('expense-desc-input');
const expenseCategorySelect = document.getElementById('expense-category-select');
const expenseAmountInput = document.getElementById('expense-amount-input');
const addExpenseBtn = document.getElementById('add-expense-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const netIncomeCell = document.getElementById('net-income');
const totalExpenseCell = document.getElementById('total-expense');

// ----------- HELPER FUNCTIONS -----------

// Recalculate and update total income and net income
function updateIncomeTotal() {
    totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
    netIncomeCell.textContent = totalIncome - totalExpense;
    totalIncomeCell.textContent = totalIncome;
    updateNetIncome();
}

// Recalculate and update total expense and net income
function updateExpenseTotal() {
    totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
    totalExpenseCell.textContent = totalExpense;
    updateNetIncome();
}

// Update net income display
function updateNetIncome() {
    netIncomeCell.textContent = totalIncome - totalExpense;
}

// ----------- EVENT LISTENERS -----------

// Add Income button click handler
addIncomeBtn.addEventListener('click', function() {
    // Get input values
    const date = incomeDateInput.value;
    const desc = incomeDescInput.value.trim();
    const category = incomeCategorySelect.value;
    const amount = Number(incomeAmountInput.value);

    // Validate inputs
    if (!date || !desc || !category || isNaN(amount) || amount <= 0) {
        alert('Please fill all income fields correctly.');
        return;
    }

    // Create income object and add to array
    const income = { date, desc, category, amount };
    incomes.push(income);

    // Add new row to income table
    const newRow = incomesTableBody.insertRow();
    newRow.insertCell().textContent = date;
    newRow.insertCell().textContent = desc;
    newRow.insertCell().textContent = category;
    newRow.insertCell().textContent = amount;

    // Create and append delete button for this row
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
        // Remove income from array and table, update totals
        incomes.splice(incomes.indexOf(income), 1);
        incomesTableBody.removeChild(newRow);
        updateIncomeTotal();
    };
    deleteCell.appendChild(deleteBtn);

    // Update totals
    updateIncomeTotal();

    // Clear input fields
    incomeDateInput.value = '';
    incomeDescInput.value = '';
    incomeCategorySelect.value = '';
    incomeAmountInput.value = '';
});

// Add Expense button click handler
addExpenseBtn.addEventListener('click', function() {
    // Get input values
    const date = expenseDateInput.value;
    const desc = expenseDescInput.value.trim();
    const category = expenseCategorySelect.value;
    const amount = Number(expenseAmountInput.value);

    // Validate inputs
    if (!date || !desc || !category || isNaN(amount) || amount <= 0) {
        alert('Please fill all expense fields correctly.');
        return;
    }

    // Create expense object and add to array
    const expense = { date, desc, category, amount };
    expenses.push(expense);

    // Add new row to expense table
    const newRow = expensesTableBody.insertRow();
    newRow.insertCell().textContent = date;
    newRow.insertCell().textContent = desc;
    newRow.insertCell().textContent = category;
    newRow.insertCell().textContent = amount;

    // Create and append delete button for this row
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
        // Remove expense from array and table, update totals
        expenses.splice(expenses.indexOf(expense), 1);
        expensesTableBody.removeChild(newRow);
        updateExpenseTotal();
    };
    deleteCell.appendChild(deleteBtn);

    // Update totals
    updateExpenseTotal();

    // Clear input fields
    expenseDateInput.value = '';
    expenseDescInput.value = '';
    expenseCategorySelect.value = '';
    expenseAmountInput.value = '';
});