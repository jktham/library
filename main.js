const shelf = document.querySelector("#shelf");
const titleInput = document.querySelector("#input-title");
const authorInput = document.querySelector("#input-author");
const pagesInput = document.querySelector("#input-pages");
const readInput = document.querySelector("#input-read");
const inputForm = document.querySelector("#input-form");
const randomBookButton = document.querySelector("#random-book");
const deleteLibraryButton = document.querySelector("#delete-library");

let library = [];

inputForm.addEventListener("submit", () => {
    if (inputForm.checkValidity()) {
        addBook(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
        drawBooks(library);
        inputForm.reset();
    }
});

randomBookButton.addEventListener("click", () => {
    let randomTitles = ["A Game of Thrones", "Harry Potter and the Chamber of Secrets", "To Kill a Mockingbird", "The Great Gatsby", "Frankenstein", "Faust"];
    let randomAuthors = ["George R. R. Martin", "J. K. Rowling", "Harper Lee", "F. Scott Fitzgerald", "Mary Shelley", "Johann Wolfgang von Goethe"];
    let randomTitle = randomTitles[Math.floor(Math.random()*randomTitles.length)];
    let randomAuthor = randomAuthors[Math.floor(Math.random()*randomAuthors.length)];
    let randomPage = Math.floor(Math.random()*1000);
    let randomRead = Math.random() < 0.5;
    addBook(randomTitle, randomAuthor, randomPage, randomRead);
    drawBooks(library);
});

deleteLibraryButton.addEventListener("click", () => {
    library = [];
    drawBooks(library);
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
}

function drawBooks(lib) {
    shelf.innerHTML = "";
    for (let i=0; i<lib.length; i++) {
        let book = lib[i];

        let bookCard = document.createElement("div");
        bookCard.id = "book-card";
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

        shelf.appendChild(bookCard);
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookRead);
    }
}