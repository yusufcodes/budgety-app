// Data module
var budgetController = (function() {
    
    // Function Constructor
    // Can create many different expenses/income based on this template
    var Expense = function(id, desc, value)
    {
        this.id = id;
        this.desc = desc;
        this.value = value;
    }

    var Income = function(id, desc, value)
    {
        this.id = id;
        this.desc = desc;
        this.value = value;
    }

    // Calculates the total of either the expenses or incomes entered into the app
    var calculateTotal = function(type)
    {
        var total = 0;

        // Iterating over specified array and totalling the values
        data.allItems[type].forEach(function(curr)
        {
            total += curr.value;
        });
        
        // Setting 'totals' value for exp or inc to our calculated value
        data.totals[type] = total;
    }

    /* 'Data' object to hold two things
    1. 'allItems': holds our expenses and incomes in 2 separate arrays 
    2. 'totals': holds the total amount of expenses and incomes as two values */
    var data =
    {
        allItems:
        {
            exp: [],
            inc: []
        },

        totals:
        {
            exp: 0,
            inc: 0
        },

        budget: 0,
        percentage: -1
    };

    // Contains public methods
    return {
        // Method to allow the addition of a new 'income' or 'expense' to our data structure
        addItem: function(type, desc, val) 
        {
            var newItem, id;

            // Getting the size of the array to calculate the new ID from
            var arraySize = data.allItems[type].length - 1;

            // ID = The ID of the last item plus one
            /* For the first item, the array will be empty therefore we can set the ID to 0
            First item is when the arraySize is -1 (empty) */
            arraySize === -1 ? id = 0 : id = data.allItems[type][arraySize].id + 1;

            // Determining income type
            (type === 'exp') ? newItem = new Expense(id, desc, val) : newItem = new Income(id, desc, val);

            // Add item to respective expense type
            data.allItems[type].push(newItem);

            // Return new item created
            return newItem;
        },

        calculateBudget: function()
        {
            // Totals of income and expenses are calculated
            calculateTotal('exp');
            calculateTotal('inc');

            // Totals calculated are subtracted from each other for a total budget
            data.budget = data.totals.inc - data.totals.exp;

            // Percentage of the budget is calculated
            if (data.totals.inc > 0)
            data.percentage = Math.round((data.totals.exp/data.totals.inc)*100);

            else
            data.percentage = -1;
        },

        // Making budget variables accessible
        getBudget: function()
        {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        }
    }
})();

// UI module
var UIController = (function() {

    // Strings stored here for easy reference
    var DOMstrings = 
    {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetValue: '.budget__value',
        budgetIncome: '.budget__income--value',
        budgetExpense: '.budget__expenses--value',
        budgetPercentage: '.budget__expenses--percentage'
    }

    return {
        getInput: function()
        {
            /* Getting the input values
            Returned as an object with the three properties we need */
            return {
                // Income type - 'inc' or 'exp'
                type: document.querySelector(DOMstrings.inputType).value,
                // Description
                desc: document.querySelector(DOMstrings.inputDescription).value,
                // Amount
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },

        // Adding an income / expense to the user interface
        /* obj: item to add
           type: the type of income being added */
        addListItem: function(obj, type)
        {
            var html, newHtml, element;

            /* My method: use 'obj' attributes to create a new HTML string:
            var HTMLstring = '<div class="item clearfix" id='+type+'-'+obj.id+'"><div class="item__description">'+obj.desc+'</div><div class="right clearfix"><div class="item__value">+'+obj.value+'</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>' */

            /* Instructor method: Use if/else to determine income type, then replace the placeholders using 'replace' method */

            // Create HTML string
            if (type === 'inc')
            {
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                element = DOMstrings.incomeContainer;
            }
            else if (type === 'exp')
            {
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                element = DOMstrings.expensesContainer;
            }

            // Place data into 'new' HTML string - using replace
            /* How 'replace' works: 
            Placeholders are represented as follows: %id%, %description%, %value%.
            This is passed into 'replace' each time, followed by what we want to replace it with. */

            newHtml = html.replace('%id%', obj.id); // This copies 'html' into 'newHtml', with the object's id

            /* Following two lines uses the replace method on newHtml now, since we have already copied the original HTML into newHtml. */
            newHtml = newHtml.replace('%description%', obj.desc);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function()
        {
            var fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fields.forEach( function(current, index, array)
            {
                current.value = "";
            });

            fields[0].focus();
        },

        // obj: the budget data needed
        displayBudget: function(obj)
        {
            // Get 4 values from obj

            // Target DOM elements

            document.querySelector(DOMstrings.budgetValue).textContent = '+ '+obj.budget;
            document.querySelector(DOMstrings.budgetIncome).textContent = '+ '+obj.totalInc;
            document.querySelector(DOMstrings.budgetExpense).textContent = '- '+obj.totalExp;

            if (obj.percentage > 0)
            document.querySelector(DOMstrings.budgetPercentage).textContent = obj.percentage+'%';

            else
            document.querySelector(DOMstrings.budgetPercentage).textContent = '---';

            // Change the values of these to values retrieved
        },

        getDOMstrings: function()
        {
            return DOMstrings;
        }
    }
})();

// Main module
var controller = (function(budgetCtrl, UICtrl) {
    var setupEventListeners = function()
    {
        var DOM = UICtrl.getDOMstrings();

        // Event listener for when the user clicks on the 'add' button
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        // Event listener for when the user clicks *any* key
        document.addEventListener('keypress', function(event) 
        {
            // If user hits enter, add item to app by calling ctrlAddItem function
            // 'which' property for older browsers which may not have keyCode
            if (event.keyCode === 13 || event.which === 13) 
            {
                ctrlAddItem();
            }
        });
    }

    var updateBudget = function()
    {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        var budget = budgetCtrl.getBudget();

        // 3. Display the budget to the UI
        UICtrl.displayBudget(budget);
    }

    // Income / Expense should be added to the relevant area
    var ctrlAddItem = function()
    {
        // 1. Get the input data from fields
        var input = UICtrl.getInput();
         
        /* Validation ensuring there is data in the input */
        if (input.desc !== "" && !isNaN(input.value) && input.value > 0)
        {
            // 2. Add the item to the budget controller
            var addItem = budgetCtrl.addItem(input.type, input.desc, input.value);

            // 3. Add the item to the UI
            UICtrl.addListItem(addItem, input.type);

            // 4. Clear fields
            UICtrl.clearFields();

            // 5. Calculate + update budget
            updateBudget();
        }
    }

    return {
        init: function()
        {
            console.log('App has started');

            // Resets values
            UICtrl.displayBudget(
                {budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0}
            );
            setupEventListeners();
        }
    }
    

})(budgetController, UIController);

controller.init();