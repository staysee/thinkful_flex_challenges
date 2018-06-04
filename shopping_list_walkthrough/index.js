'use strict';

// `STORE` is responsible for storing the underlying data that our app needs to keep track of in order to work
// For a shoppng list, our data model is pretty simple.
// We just have an array of shopping list items. Each one is an object with a `name` and a `checked` property that indicates if it's checked off or not.
// We're pre-adding items to the shopping list so there's something to see when the page first loads
const STORE = [
  {name: "apples", checked: false},
  {name: "oranges", checked: false},
  {name: "milk", checked: false},
  {name: "bread", checked: false},
]

function generateItemElement(item, itemIndex) {
  return `
    <li>${item.name}</li>
  `;
}

function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");
  //iterate over each item in `STORE` and generate an <li> string
  //map over items and call new function (generateItemElement) to generate the item string
  const items = shoppingList.map((item, index) => generateItemElement(item, index));

  // join the individual item string into one big string (generateShoppingItemsString)
  return items.join("");
}

function renderShoppingList() {
  //render the shopping list in the DOM
  // <li> for each element to `.js-shopping-list`
  // for each item in STORE, generate a string representing an <li> with the item name as inner text, the item's index in the STORE set as a data attribute on the <li>, the item's checked state (true or false) rendered as the presence or absence of a CSS class for indicating checked items (.shopping-item_checked)
  //join together the individual item strings into one long string
  //insert the <li>s string inside .js-shopping-list <ul> in the DOM
  console.log('`renderShoppingList` ran');

  const shoppingListItemsString = generateShoppingItemsString(STORE);

  //insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

function handleNewItemSubmit() {
  //this function will be responsible for when users add a new shopping list item
  console.log('`handleNewItemSubmit` ran');
}

function handleItemCheckClicked() {
  //this function will be responsible for when users click the "check" button on a shopping list item
  console.log('`handleNewItemSubmit` ran');
}

function handleDeleteItemClicked() {
  //this function will be responsible for when users want to delete a shopping list item
  console.log('`handleDeleteItemClicked` ran');
}


//this function will be our callback when the page loads. it's responsible for initially rendering the shopping list, and activating our individual functions that handle new item submission and user clicks on the "check" and "delete" buttons for individual shopping list items
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

//when the page loads, call `handleShoppingList`
$(handleShoppingList);
