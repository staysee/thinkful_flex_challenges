'use strict';

// `STORE` is responsible for storing the underlying data that our app needs to keep track of in order to work
// For a shoppng list, our data model is pretty simple.
// We just have an array of shopping list items. Each one is an object with a `name` and a `checked` property that indicates if it's checked off or not.
// We're pre-adding items to the shopping list so there's something to see when the page first loads
const STORE = [
  {name: "apples", checked: false},
  {name: "oranges", checked: false},
  {name: "milk", checked: true},
  {name: "bread", checked: false},
]

function generateItemElement(item, itemIndex) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
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

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  //this function will be responsible for when users add a new shopping list item
  console.log('`handleNewItemSubmit` ran');

  //listen for new submission
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');

    const newItemName = $('.js-shopping-list-entry').val();
    console.log(newItemName);

    //clear input field
    $('.js-shopping-list-entry').val(" ");

    //add item to STORE
    addItemToShoppingList(newItemName);
    renderShoppingList();

  });

}

function toggleCheckedForListItem(itemIndex) {
  console.log("Toggling checked property for item at index " + itemIndex);
  STORE[itemIndex].checked = !STORE[itemIndex].checked;
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  //this function will be responsible for when users click the "check" button on a shopping list item
  console.log('`handleNewItemSubmit` ran');

  //listen for when user clicks check button - need to use event delegation
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    //retrieve item's index in STORE from data-attribute
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    console.log(itemIndex);
    //toggle checked property for item at that index
    toggleCheckedForListItem(itemIndex);
    //re-render shopping list
    renderShoppingList();
  });
}

function deleteListItem(itemIndex) {
  console.log("Deleting item at index " + itemIndex);
  STORE.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
  //this function will be responsible for when users want to delete a shopping list item
  console.log('`handleDeleteItemClicked` ran');
  //listen for when user clicks delete button - use event delegation
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    //retrieve item's index in STORE from data attribute
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    //remove item from STORE
    deleteListItem(itemIndex);
    //re-render shopping list
    renderShoppingList();
  })
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
