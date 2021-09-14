const shelf = document.querySelector("#shelf");
const addBookButton = document.querySelector("#add-book");

let library = [];

addBookButton.addEventListener("click", () => {
    addBook();
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBook(title, author, pages, read) {
    library.push(new Book(title, author, pages, read));

    let bookDiv = document.createElement("div");
    bookDiv.id = "book-div";
    shelf.appendChild(bookDiv);
}