// segementing our code by using means of modules with immediatly invoked functions
var budgetController = (function () {})();

var UIController = (function () {})();

var controller = (function (budgetCtrl, UICtrl) {
  // the function that will add new item to the app
  var ctrlAddItem = function () {
    // 1. get the field input data
    // 2. add the item to the budget controller
    // 3. add the item to the UI
    // 4. calculate the budget
    // 5. display the budget in the UI
  };

  document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);

  document.addEventListener("keypress", function (e) {
    if (e.keyCode === 13 || e.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
