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
        }
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
        inputBtn: '.add__btn'
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
                value: document.querySelector(DOMstrings.inputValue).value
            }
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
    
    // Income / Expense should be added to the relevant area
    var ctrlAddItem = function ()
    {
        // 1. Get the input data from fields
        var input = UICtrl.getInput();
         
        // 2. Add the item to the budget controller
        var addItem = budgetCtrl.addItem(input.type, input.desc, input.value);

        // 3. Add the item to the UI

        // 4. Calculate the budget

        // 5. Display the budget
    }

    return {
        init: function()
        {
            console.log('App has started');
            setupEventListeners();
        }
    }
    

})(budgetController, UIController);

controller.init();