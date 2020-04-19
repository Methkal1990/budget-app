// segementing our code by using means of modules with immediatly invoked functions
var budgetController = (function () {
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
  };

  return {
    addItem: function (type, des, val) {
      var newItem, ID;
      var typeData = data.allItems[type];
      // create a new id
      if (typeData.length > 0) {
        ID = typeData[typeData.length - 1].id + 1;
      } else {
        ID = 0;
      }
      // create a new item based on the type 'inc' or 'exp'
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }
      // push the new item to our data structure
      typeData.push(newItem);
      // return the new element
      return newItem;
    },
  };
})();

var UIController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    addListItem: function (obj, type) {
      var html, element;
      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html = `
        <div class="item clearfix" id="income-${obj.id}">
        <div class="item__description">${obj.description}</div>
        <div class="right clearfix">
            <div class="item__value">${obj.value}</div>
            <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div>
        </div>
        `;
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;
        html = `
        <div class="item clearfix" id="expense-${obj.id}">
        <div class="item__description">${obj.description}</div>
        <div class="right clearfix">
            <div class="item__value">${obj.value}</div>
            <div class="item__percentage">21%</div>
            <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div>
        </div>
        `;
      }

      document.querySelector(element).innerHTML += html;
    },
    getDOMStrings: function () {
      return DOMstrings;
    },
  };
})();

// Global App Controller
var controller = (function (budgetCtrl, UICtrl) {
  // the function that will add new item to the app
  var ctrlAddItem = function () {
    // 1. get the field input data
    var input = UICtrl.getInput();

    // 2. add the item to the budget controller
    var newItem = budgetCtrl.addItem(
      input.type,
      input.description,
      input.value,
    );
    // 3. add the item to the UI
    UICtrl.addListItem(newItem, input.type);
    // 4. calculate the budget
    // 5. display the budget in the UI
  };
  var setupEventListeners = function () {
    var DOM = UICtrl.getDOMStrings();
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function () {
      // console.log("Application has started");
      setupEventListeners();
    },
  };
})(budgetController, UIController);

// initialize the application
controller.init();
