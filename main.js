const shelf = document.querySelector("#shelf");
const titleInput = document.querySelector("#input-title");
const authorInput = document.querySelector("#input-author");
const pagesInput = document.querySelector("#input-pages");
const readInput = document.querySelector("#input-read");
const inputForm = document.querySelector("#input-form");
const randomBookButton = document.querySelector("#random-book");
const deleteLibraryButton = document.querySelector("#delete-library");

let bookCardArr = [];
let bookDeleteArr = [];
let library = [];

inputForm.addEventListener("submit", () => {
    if (inputForm.checkValidity()) {
        addBook(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
        updateShelf(library);
        inputForm.reset();
    }
});

randomBookButton.addEventListener("click", () => {
    let randomTitles = ["A Game of Thrones", "Harry Potter and the Chamber of Secrets", "To Kill a Mockingbird", "The Great Gatsby", "Frankenstein", "Faust", "The Lord of the Rings"];
    let randomAuthors = ["George R. R. Martin", "J. K. Rowling", "Harper Lee", "F. Scott Fitzgerald", "Mary Shelley", "Johann Wolfgang von Goethe", "J. R. R. Tolkien"];
    let randomIndex = Math.floor(Math.random()*randomTitles.length);
    let randomTitle = randomTitles[randomIndex];
    let randomAuthor = randomAuthors[randomIndex];
    let randomPage = Math.floor(Math.random()*1000);
    let randomRead = Math.random() < 0.5;
    addBook(randomTitle, randomAuthor, randomPage, randomRead);
    updateShelf(library);
});

deleteLibraryButton.addEventListener("click", () => {
    library = [];
    updateShelf(library);
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

function updateShelf(lib) {
    shelf.innerHTML = "";
    for (let i=0; i<lib.length; i++) {
        let book = lib[i];
        
        let bookLabel = document.createElement("div");
        bookLabel.textContent = i;
        bookLabel.classList.add("book-label");
        let bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.dataset.index = i;
        let bookTitle = document.createElement("span");
        bookTitle.textContent = book.title;
        bookTitle.classList.add("book-title");
        let bookAuthor = document.createElement("span");
        bookAuthor.textContent = book.author;
        bookAuthor.classList.add("book-author");
        let bookPages = document.createElement("span");
        bookPages.textContent = book.pages + " pages";
        bookPages.classList.add("book-pages");
        let bookRead = document.createElement("span");
        bookRead.textContent = book.read ? "Read" : "Not Read";
        bookRead.classList.add("book-read");
        let bookDelete = document.createElement("button");
        bookDelete.textContent = "X";
        bookDelete.classList.add("book-delete");
        bookDelete.dataset.index = i;

        shelf.appendChild(bookCard);
        bookCard.appendChild(bookLabel);
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookRead);
        bookCard.appendChild(bookDelete);
    }

    bookCardArr = Array.from(document.querySelectorAll(".book-card"));
    bookDeleteArr = Array.from(document.querySelectorAll(".book-delete"));
    
    for (let i=0; i<bookCardArr.length; i++) {
        bookCardArr[i].addEventListener("mouseover", () => {
            bookDeleteArr[i].style.visibility = "visible";
        });
        bookCardArr[i].addEventListener("mouseleave", () => {
            bookDeleteArr[i].style.visibility = "hidden";
        });
        bookDeleteArr[i].addEventListener("click", () => {
            library.splice(i, 1);
            updateShelf(library);
        });
    }
}