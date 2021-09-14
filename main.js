const shelf = document.querySelector("#shelf");
const addBookButton = document.querySelector("#add-book");
const titleInput = document.querySelector("#input-title");
const authorInput = document.querySelector("#input-author");
const pagesInput = document.querySelector("#input-pages");
const readInput = document.querySelector("#input-read");

let library = [];

addBookButton.addEventListener("click", () => {
    addBook(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBook(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    library.push(book);

    let bookDiv = document.createElement("div");
    bookDiv.id = "book-div";

    shelf.appendChild(bookDiv);
}