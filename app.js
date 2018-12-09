// Data module
var budgetController = (function() {

})();

// UI module
var UIController = (function() {

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