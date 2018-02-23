'use strict';

//GLOBAL VARIABLES
var allProducts = [];
var allChoices = [];
var selectBox = document.getElementById('select');
var selectionsRetrieved = localStorage.getItem('selectionsToLS', JSON.stringify(allChoices));
var infoLabels = ['Name: ', 'Address: ', 'City: ', 'State: ', 'Zip Code: ', 'Phone Number: ']
var info = [];
var infoRetrieved = localStorage.getItem('infoToLS', JSON.stringify(info));

//index
var imageSec = document.getElementById('pictures');
var addButton = document.getElementById('add');
var cartButton = document.getElementById('go-to-cart');
var saveAddress = document.getElementById('address');

//cart
var orderBox = document.getElementById('order');
var removeButton = document.getElementsByClassName('remove');
var infoTable = document.getElementById('info-table');


//ORIGINAL PRODUCT CONSTRUCTOR AND INSTANCES
function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  allProducts.push(this);
}

new Product('R2D2 suitcase', 'img/bag.jpg');
new Product('Banana slicer', 'img/banana.jpg');
new Product('iPad stand toilet paper roll holder', 'img/bathroom.jpg');
new Product('Open-toed rainboots', 'img/boots.jpg');
new Product('All-in-one breakfast maker', 'img/breakfast.jpg');
new Product('Meatball-flavored bubblegum', 'img/bubblegum.jpg');
new Product('Inverted chair', 'img/chair.jpg');
new Product('Cthulhu action figure', 'img/cthulhu.jpg');
new Product('Duck beak for dogs', 'img/dog-duck.jpg');
new Product('Freshly-slain canned dragon meat', 'img/dragon.jpg');
new Product('Pen utensils', 'img/pen.jpg');
new Product('Sweeper booties for pets', 'img/pet-sweep.jpg');
new Product('Pizza-cutting scissors', 'img/scissors.jpg');
new Product('Shark attack sleeping bag', 'img/shark.jpg');
new Product('Baby sweeper onesie', 'img/sweep.png');
new Product('Tauntaun sleeping bag', 'img/tauntaun.jpg');
new Product('Canned unicorn meat', 'img/unicorn.jpg');
new Product('Wiggly tentacle thumb drive', 'img/usb.gif');
new Product('Self-filling watering can', 'img/water-can.jpg');
new Product('Sure-to-spill wine glass', 'img/wine-glass.jpg');

//SELECTION CONSTRUCTOR
function SelectedProduct(index, quantity) {
  this.index = index;
  this.name = allProducts[index].name;
  this.filepath = allProducts[index].filepath;
  this.quantity = quantity;
  allChoices.push(this);
}

//RENDER HTML PAGES
function renderIndex() {
  for (var i = 0; i < allProducts.length; i++) {
    var figureEl = document.createElement('figure');
    var figCapEl = document.createElement('figcaption');
    var imgEl = document.createElement('img');
    imageSec.appendChild(figureEl);
    figureEl.appendChild(imgEl);
    figureEl.appendChild(figCapEl);
    imgEl.src = allProducts[i].filepath;
    imgEl.alt = allProducts[i].name;
    imgEl.title = allProducts[i].name;
    figCapEl.textContent = allProducts[i].name;
  }
  for (var j = 0; j < allProducts.length; j++) {
    var optionEl = document.createElement('option');
    optionEl.textContent = allProducts[j].name;
    optionEl.value = j;
    selectBox.appendChild(optionEl);
  }
}

function renderCart() {
  for (var i = 0; i < info.length; i++) {
    var trEl = document.createElement('tr');
    var tdEl = document.createElement('td');
    tdEl.textContent = infoLabels[i] + info[i];
    trEl.appendChild(tdEl);
    infoTable.appendChild(trEl);
  }
  for (var k = 0; k < allChoices.length; k++) {
    var figureEl = document.createElement('figure');
    var figCapEl = document.createElement('figcaption');
    var imgEl = document.createElement('img');
    var buttonEl = document.createElement('button');
    orderBox.appendChild(figureEl);
    figureEl.appendChild(imgEl);
    figureEl.appendChild(figCapEl);
    imgEl.src = allChoices[k].filepath;
    imgEl.alt = allChoices[k].name;
    imgEl.title = allChoices[k].name;
    figCapEl.textContent = allChoices[k].name + ': ' + allChoices[k].quantity;
    buttonEl = document.createElement('button');
    buttonEl.textContent = 'Remove Item';
    buttonEl.classList.add('remove');
    buttonEl.id = k;
    figureEl.appendChild(buttonEl);
    for (var i = 0; i < removeButton.length; i++){
      removeButton[i].addEventListener('click', removeSelection);
    }
  }
}

//INDEX.HTML PAGE ++++++++++++++++++++++++++++++++++++++++++++++++++
if (imageSec) {
  if (localStorage.selectionsToLS) {
    allChoices = JSON.parse(selectionsRetrieved);
    info = JSON.parse(infoRetrieved);
  }
  renderIndex();
  document.addEventListener('DOMContentLoaded', changeSelection);
  addButton.addEventListener('click', addSelection);
  cartButton.addEventListener('click', storeSelections);
  saveAddress.addEventListener('submit', saveForm);
}

//CART.HTML PAGE ++++++++++++++++++++++++++++++++++++++++++++++++++
if (orderBox) {
  allChoices = JSON.parse(selectionsRetrieved);
  info = JSON.parse(infoRetrieved);
  renderCart();
}

//EVENT LISTENER FUNCTIONS
function changeSelection() {
  selectBox.onchange = function() {
    localStorage['selection'] = this.value;
  };
}

function addSelection() {
  var index = parseInt(localStorage.getItem('selection'));
  var input = document.getElementById('quantity').value;
  new SelectedProduct(index, input);
}

function storeSelections() {
  localStorage.setItem('selectionsToLS', JSON.stringify(allChoices));
}

function saveForm(event) {
  info = [event.target.name.value, event.target.address.value, event.target.city.value, event.target.state.value, event.target.zip.value, event.target.phone.value];
  localStorage.setItem('infoToLS', JSON.stringify(info));
}

function removeSelection(event) {
  var selectionValue = event.target.id;
  allChoices.splice(selectionValue, 1);
  orderBox.textContent = '';
  renderCart();
  localStorage.setItem('selectionsToLS', JSON.stringify(allChoices));
}