//definition budget , expensesList variable
let budget = !!(JSON.parse(localStorage.getItem("budget")))?
JSON.parse(localStorage.getItem("budget")):
{budget:0 , expensed:0 , balance:0};
const expensesList = [];
// add Expense is defined for specifying add or update expense
let addExpense = -1;

render(expensesList,budget);

// definition variable for getting element
const budgetBtn = document.querySelector(".budget-btn");
const expenseBtn = document.querySelector(".expense-btn");
const budgetInput = document.querySelector(".budget-input");
const expenseInput = document.querySelector(".expense-input");
const nameExpenseInput = document.querySelector(".nameExpense-input");

// definition variable for validating budgetInput , expenseInput , nameExpenseInput value
let budgetValid = false;
let expenseValid = false;
let nameExpenseValid = false;


// definition change event for budgetInput validation 
budgetInput.addEventListener("keyup",(event)=>{
    const budgetValue = event.target.value;
    const validationValue = document.querySelector(".validate-budget-input");
    validationValue.innerHTML = null;
    if((budgetValue.length==0) || isNaN(budgetValue) || Number(budgetValue)==0){
        validationValue.innerHTML = "invalid value";
        budgetValid = false;
    }
    else{
        validationValue.innerHTML = null;
        budgetValid = true;
    }
})

// definition change event for expenseInput validation 
expenseInput.addEventListener("keyup",(event)=>{
    const expenseValue = event.target.value;
    const validationValue = document.querySelector(".validate-expense-input");
    validationValue.innerHTML = null;
    if((expenseValue.length==0) || isNaN(expenseValue) || Number(expenseValue)==0){
        validationValue.innerHTML = "invalid value";
        expenseValid = false;
    }
    else{
        validationValue.innerHTML = null;
        expenseValid = true;

    }
})
// definition change event for nameExpenseInput validation 
nameExpenseInput.addEventListener("keyup",(event)=>{
    const expenseName = event.target.value;
    const validationValue = document.querySelector(".validate-nameExpense");
    validationValue.innerHTML = null;
    if((expenseName.length==0)){
        validationValue.innerHTML = "invalid value";
        nameExpenseValid = false;
    }
    else{
        validationValue.innerHTML = null;
        nameExpenseValid = true;
    }
})

// definition editExpense 
const editExpense = function(index){
    // transform expense & nameExpense to expenseInput and  nameExpenseInpu
    expenseInput.value = expensesList[index].amount;
    nameExpenseInput.value = expensesList[index].name;
    // deleteing and adding expense amount from budget 
    budget.balance += expensesList[index].amount;
    budget.expensed -= expensesList[index].amount;
    // updating name expenseBtn 
    expenseBtn.innerHTML = "update expense";
    //changing addExpense value for specifying to update expense
    addExpense = index;
    render(expensesList,budget);
}

// definition deleteExpense
const deleteExpense = function(index){
    // deleteing and adding expense amount from budget 
    budget.balance += expensesList[index].amount;
    budget.expensed -= expensesList[index].amount;
    //deleteing expense from expenseList 
    expensesList.splice(1,index);
    render(expensesList,budget)
}

function render(expensesList,budget){
    // definition variable for getting Tbody-expense-table element in html and inserting epnenses in expense-table
    const TbodyExpenseTable = document.querySelector('.Tbody-expense-table');
    TbodyExpenseTable.innerHTML = null;
    expensesList.forEach((expense,index)=>{
        const trTbodyExpenseTable = document.createElement("tr");
        trTbodyExpenseTable.innerHTML = `
        <td class="color-secondary fo-s-14 fo-w-500 txt-transform-up">-${expense.name}</td>
        <td class="color-secondary fo-s-14 fo-w-500">&#65284 ${expense.amount}</td>
        <td >
            <i class="fa-solid fa-pen-to-square color-tertiary"onclick="editExpense(${index})" ></i>
            <i class="fa-solid fa-trash color-secondary" onclick="deleteExpense(${index})"></i>
        </td>`;
        TbodyExpenseTable.append(trTbodyExpenseTable);
    })

    // definition variable for getting Tbody-budget-table element in html and inserting budget in budget-table
    const TbodyBudgetTable = document.querySelector(".tbody-budget-table");
    TbodyBudgetTable.innerHTML = null;
    const trTbodyBudgetTable  = document.createElement("tr");
    trTbodyBudgetTable .innerHTML = `<td class="color-primary fo-s-30 fo-w-500">&#65284 ${budget.budget}</td>
    <td class="color-secondary fo-s-30 fo-w-500">&#65284 ${budget.expensed}</td>
    <td class="color-primary fo-s-30 fo-w-500">&#65284 ${budget.balance}</td>`;
    TbodyBudgetTable.append(trTbodyBudgetTable );
    // saving budget-object in localStorage
    localStorage.setItem("budget",JSON.stringify(budget));
}

// definition click event for budget-button
budgetBtn.addEventListener("click",(event)=>{
    event.preventDefault();
    //  update budget object if entered value is valid 
    if(budgetValid){
        budget.budget = budget.balance  = +(budgetInput.value);
        budget.expensed = 0 ;
        budgetInput.value = null;
        render(expensesList,budget);
    }
});

// definition click event for expense-button
expenseBtn.addEventListener("click",(event)=>{
    event.preventDefault();
    //  update expenseList if entered values are valid 
    if(expenseValid && nameExpenseValid){
        // assigning newExpense to an object
        const newExpense = {
            name : nameExpenseInput.value,
            amount : Number(expenseInput.value),
        }
        // updating budget object
        budget.balance -= newExpense.amount;
        budget.expensed += newExpense.amount;

        nameExpenseInput.value = null;
        expenseInput.value = null;
        // add expense to expenseList if addExpense value is -1 otherwise update expenseList 
        if(addExpense == -1){
            expensesList.push(newExpense);
        }
        else{
            expensesList.splice(addExpense,1,newExpense);
            expenseBtn.innerHTML = "add expense";
        }
        render(expensesList,budget);
    }
  
});

