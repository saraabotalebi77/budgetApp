//definition budget , expensesList variable
let budget = !!(JSON.parse(localStorage.getItem("budget")))?
JSON.parse(localStorage.getItem("budget")):
{budget:0 , expensed:0 , balance:0 , expensesList:[]};
// const expensesList = [];
// add Expense is defined for specifying add or update expense
let addExpense = -1;
//definition variable for creating element for deleting all expenses
const btnDeleteExpensesWrapper = document.createElement("div");
render(budget);

// definition variable for getting element
const budgetForm = document.querySelector(".budget-form");
const expenseBtn = document.querySelector(".expense-btn");
const budgetInput = document.querySelector(".budget-input");
const expenseInput = document.querySelector(".expense-input");
const nameExpenseInput = document.querySelector(".nameExpense-input");
const budgetValidationValue = document.querySelector(".validate-budget-input");
const expenseValidationValue = document.querySelector(".validate-expense-input");
const nameExpenseValidationValue = document.querySelector(".validate-nameExpense");

// definition variable for validating budgetInput , expenseInput , nameExpenseInput value
let budgetValid = false;
let expenseValid = false;
let nameExpenseValid = false;


// definition change event for budgetInput validation 
budgetInput.addEventListener("keyup",(event)=>{
    const budgetValue = event.target.value;
    budgetValidationValue.innerHTML = null;
    if(isNaN(budgetValue) || Number(budgetValue)<0 ){
        budgetValidationValue.innerHTML = "invalid value";
        budgetValid = false;
    }
    else{
        budgetValidationValue.innerHTML = null;
        budgetValid = true;
    }
})

// definition change event for expenseInput validation 
expenseInput.addEventListener("keyup",(event)=>{
    const expenseValue = event.target.value;
    expenseValidationValue.innerHTML = null;
    if(isNaN(expenseValue)){
        expenseValidationValue.innerHTML = "invalid value";
        expenseValid = false;
    }
    else{
        expenseValidationValue.innerHTML = null;
        expenseValid = true;

    }
})
// definition change event for nameExpenseInput validation 
nameExpenseInput.addEventListener("keyup",(event)=>{
    const expenseName = event.target.value;
    nameExpenseValidationValue.innerHTML = null;
    if((expenseName.length==0 || isFinite(expenseName))){
        nameExpenseValidationValue.innerHTML = "invalid value";
        nameExpenseValid = false;
    }
    else{
        nameExpenseValidationValue.innerHTML = null;
        nameExpenseValid = true;
    }
})

// definition editExpense 
const editExpense = function(index){
    // transform expense & nameExpense to expenseInput and  nameExpenseInpu
    expenseInput.value = budget.expensesList[index].amount;
    nameExpenseInput.value = budget.expensesList[index].name;
    // deleteing and adding expense amount from budget 
    budget.balance += budget.expensesList[index].amount;
    budget.expensed -= budget.expensesList[index].amount;
    // updating name expenseBtn 
    expenseBtn.innerHTML = "update expense";
    //changing addExpense value for specifying to update expense
    addExpense = index;
    render(budget);
}

// definition deleteExpense
const deleteExpense = function(index){
    // deleteing and adding expense amount from budget 
    budget.balance += budget.expensesList[index].amount;
    budget.expensed -= budget.expensesList[index].amount;
    //deleteing expense from expenseList 
    budget.expensesList.splice(index,1);
    render(budget)
}
// definition deleteAllExpense
const deleteAllExpense = function(){
    //deleting all expenses from expensesList 
    budget.expensesList = [];
    render(budget)
}



function render(budget){
    // definition variable for getting Tbody-expense-table element in html and inserting epnenses in expense-table
    const TbodyExpenseTable = document.querySelector('.Tbody-expense-table');
    
    TbodyExpenseTable.innerHTML = null;
    budget.expensesList.forEach((expense,index)=>{
        const trTbodyExpenseTable = document.createElement("tr");
        trTbodyExpenseTable.innerHTML = `
        <td class="color-secondary fo-s-14 fo-w-500 txt-transform-up ">${expense.name}</td>
        <td class="color-secondary fo-s-14 fo-w-500">&#65284 ${expense.amount}</td>
        <td >
            <i class="fa-solid fa-pen-to-square color-tertiary"onclick="editExpense(${index})" ></i>
            <i class="fa-solid fa-trash color-secondary" onclick="deleteExpense(${index})"></i>
        </td>`;
        TbodyExpenseTable.append(trTbodyExpenseTable);
    })

    if(budget.expensesList.length!=0){
        
        btnDeleteExpensesWrapper.innerHTML = null;
        btnDeleteExpensesWrapper.innerHTML = `
        <div class="btn-delete-expenses-wrapper mlr-auto">
            <button class="expense-btn color-secondary txt-transform-cap w-100" onclick="deleteAllExpense()">Delete Expenses</button>
        </div>`;
        const expenseTableWrapper = document.querySelector(".expense-table-wrapper");
        expenseTableWrapper.append(btnDeleteExpensesWrapper);
    }
    else{
        btnDeleteExpensesWrapper.innerHTML = null;
    }

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
budgetForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    //  update budget object if entered value is valid 
    if(budgetValid){
        budget.budget = budget.balance  = +(budgetInput.value);
        budget.expensed = 0 ;
        budgetInput.value = null;
        render(budget);
    }
    else{
        budgetValidationValue.innerHTML = "invalid value";
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
            budget.expensesList.push(newExpense);
        }
        else{
            budget.expensesList.splice(addExpense,1,newExpense);
            expenseBtn.innerHTML = "add expense";
        }
        render(budget);
    }
    else{
        if(!expenseValid){
            expenseValidationValue.innerHTML= "invalid value";
        }
        if(!nameExpenseValid){
            nameExpenseValidationValue.innerHTML= "invalid value";
        }
    }
  
});

