// Data module
var budgetController = (function() {

    var x = 5;

    var add = function(a)
    {
        return a + x;
    }

    return {
        publicTest: function(b)
        {
            return add(b);
        }
    }
})();

// UI module
var UIController = (function() {

})();

// Main module
var controller = (function(budgetCtrl, UICtrl) {

    var numberToReturn = budgetCtrl.publicTest(5);

    return {
        numberReturn: function()
        {
            console.log(numberToReturn);
        }
    }

})(budgetController, UIController);