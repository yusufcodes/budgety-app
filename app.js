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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
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
        UICtrl.addListItem(addItem, input.type);

        // 4. Clear fields
        UICtrl.clearFields();

        // 5. Calculate the budget

        // 6. Display the budget
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