const shelf = document.querySelector("#shelf");
const addBookButton = document.querySelector("#button-add");
const titleInput = document.querySelector("#input-title");
const authorInput = document.querySelector("#input-author");
const pagesInput = document.querySelector("#input-pages");
const readInput = document.querySelector("#input-read");
const inputForm = document.querySelector("#input-form");

let library = [];

function submitForm() {
    if (inputForm.checkValidity()) {
        addBook(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
        drawBooks(library);
        inputForm.reset();
    }
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBook(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    library.push(book);
}

function drawBooks(lib) {
    shelf.innerHTML = "";
    for (let i=0; i<lib.length; i++) {
        let book = lib[i];

        let bookDiv = document.createElement("div");
        bookDiv.id = "book-div";
        let bookTitle = document.createElement("span");
        bookTitle.textContent = book.title;
        bookTitle.id = "book-title"
        let bookAuthor = document.createElement("span");
        bookAuthor.textContent = book.author;
        bookAuthor.id = "book-author"
        let bookPages = document.createElement("span");
        bookPages.textContent = book.pages + " pages";
        bookPages.id = "book-pages"
        let bookRead = document.createElement("span");
        bookRead.textContent = book.read ? "Read" : "Not Read";
        bookRead.id = "book-read"

        shelf.appendChild(bookDiv);
        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(bookPages);
        bookDiv.appendChild(bookRead);
    }
}