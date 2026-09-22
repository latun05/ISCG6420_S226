// Global variables 
let nextItem = 0;                 // Index of next item to be added
let currentCart = new Array();    // Array holding the current cart items

// Load XML file 
function loadXMLFile(xmlFile) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", xmlFile, false);   // synchronous load
    xmlhttp.send();
    return xmlhttp.responseXML;
}

// Display all books 
function displayBooks() {
    let xmlDoc = loadXMLFile("books.xml");
    let books = xmlDoc.documentElement.getElementsByTagName("BOOK");

    let txt = "<table border='0px' id='tblBook' cellpadding='3px' cellspacing='0px'>";
    txt += "<tr><th>Item</th><th>Title</th><th>Author</th><th>Price</th><th>Add</th></tr>";

    for (let i = 0; i < books.length; i++) {
        txt += "<tr>";

        // Item number
        txt += "<td align='left'>" + i + "</td>";

        // Title
        let title = books[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
        txt += "<td align='left' id='title" + i + "'>" + title + "</td>";

        // Author
        let author = books[i].getElementsByTagName("AUTHOR")[0].childNodes[0].nodeValue;
        txt += "<td align='left'>" + author + "</td>";

        // Price
        let price = books[i].getElementsByTagName("PRICE")[0].childNodes[0].nodeValue;
        txt += "<td align='left' id='price" + i + "'>" + price + "</td>";

        // Add to cart button (with optional icon)
        txt += "<td align='right'>";
        txt += "<img src='book-icon.jpg' style='width:20px; height:20px; vertical-align:middle;'> ";
        txt += "<button type='button' id='btnAddToCart' onclick='addToCart(" + i + ")'>Add to Cart</button>";
        txt += "</td>";

        txt += "</tr>";
    }
    txt += "</table>";

    document.getElementById("txtBookInfo").innerHTML = txt;
}

// Display shopping cart 
function displayCart() {
    let txt = "<table id='tblCart' border='5px' cellpadding='1px' cellspacing='0px' align='center' style='margin:0px; border:#666 solid;'>";
    txt += "<tr><th>Item</th><th>Title</th><th>Price</th><th>Quantity</th></tr>";

    let totalCost = 0;

    for (let i = 0; i < nextItem; i++) {
        txt += "<tr>";
        txt += "<td align='left'>" + currentCart[i][0] + "</td>";
        txt += "<td align='left'>" + currentCart[i][1] + "</td>";
        txt += "<td align='left'>" + currentCart[i][2] + "</td>";
        txt += "<td align='right'>" + currentCart[i][3] + "</td>";
        totalCost += currentCart[i][2] * currentCart[i][3];
        txt += "</tr>";
    }

    // Total cost row
    txt += "<tr><td align='center' colspan='4' style='color:#900;'>Total Cost: " + parseFloat(totalCost).toFixed(2) + "</td></tr>";
    txt += "</table>";

    document.getElementById("txtCart").innerHTML = txt;
}

// Add a book to the cart 
function addToCart(selectedItem) {
    let addedIndex = -1;

    // Check if the book is already in the cart
    for (let i = 0; i < nextItem; i++) {
        if (currentCart[i][0] == selectedItem) {
            addedIndex = i;
            break;
        }
    }

    if (addedIndex == -1) {
        // New item
        currentCart[nextItem] = new Array();
        currentCart[nextItem][0] = selectedItem;
        currentCart[nextItem][1] = document.getElementById("title" + selectedItem).innerHTML;
        currentCart[nextItem][2] = document.getElementById("price" + selectedItem).innerHTML;
        currentCart[nextItem][3] = 1;
        nextItem += 1;
    } else {
        // Increase quantity
        currentCart[addedIndex][3] += 1;
    }

    displayCart();
}

// Clear the cart 
function clearCart() {
    nextItem = 0;
    currentCart = new Array();
    displayCart();
}

// Checkout
function checkOut() {
    // Build XML string
    let txt = "<ITEMS>";
    for (let i = 0; i < nextItem; i++) {
        txt += "<ITEM>";
        txt += "<TITLE>" + currentCart[i][1] + "</TITLE>";
        txt += "<PRICE>" + currentCart[i][2] + "</PRICE>";
        txt += "<QUTANTY>" + currentCart[i][3] + "</QUTANTY>";   // typo as per exercise
        txt += "</ITEM>";
    }
    txt += "</ITEMS>";

    // Create XML document object (optional, as per exercise)
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(txt, "text/xml");

    // Send to server (ProcessingOrder.php)
    let xmlHttp = new XMLHttpRequest();
    let url = "ProcessingOrder.php?XMLStr=" + encodeURIComponent(txt);
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);

    // Clear the cart after checkout
    clearCart();
}

// Initialise on page load 
window.onload = function () {
    displayBooks();
    displayCart();
};