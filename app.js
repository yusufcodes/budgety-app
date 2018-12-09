// Data module
var budgetController = (function() {

})();

// UI module
var UIController = (function() {

})();

// Main module
var controller = (function(budgetCtrl, UICtrl) {

    // Income / Expense should be added to the relevant area
    var ctrlAddItem = function ()
    {
        // 1. Get the input data from fields

        // 2. Add the item to the budget controller

        // 3. Add the item to the UI

        // 4. Calculate the budget

        // 5. Display the budget
        console.log("it works!");

    }
    // Event listener for when the user clicks on the 'add' button
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

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

})(budgetController, UIController);