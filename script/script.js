let myLibrary = [];

function books(title, author, pages, status) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.status = status;
	this.info = function () {
		return `${title} by ${author}, ${pages} pages, ${status}.`;
	};
}

//Show  and hide form
const formDiv = document.querySelector("#formDiv");
const newBookBtn = document.querySelector("#newBook");
newBookBtn.addEventListener("click", function () {
	formDiv.style.display = "flex";
});
window.addEventListener("click", function (e) {
	if (e.target == formDiv) {
		formDiv.style.display = "none";
	}
});

//Add new book.
const newBookForm = document.querySelector("#newBookForm");
newBookForm.addEventListener("submit", function () {
	const title = document.getElementById("inputTitle").value;
	const author = document.getElementById("inputAuthor").value;
	const pages = document.getElementById("inputPages").value;
	const status = document.getElementById("inputStatus").value;
	const newBook = new books(title, author, pages, status);
	myLibrary.push(newBook);
	document.getElementById("inputTitle").value = null;
	document.getElementById("inputAuthor").value = null;
	document.getElementById("inputPages").value = null;
	document.getElementById("inputStatus").value = "Not Read";
	formDiv.style.display = "none";
	displayBooks();
	console.table(myLibrary);
});

//Clear old display.

const container = document.querySelector("#container");
function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

//Display books library.
function displayBooks() {
	removeAllChildNodes(container);
	for (let i = 0; i < myLibrary.length; i++) {
		let book = document.createElement("div");
		book.id = "book" + i;
		book.className = "book";
		container.appendChild(book);
		let title = document.createElement("h1");
		title.className = "title";
		title.textContent = `"${myLibrary[i].title}"`;
		book.appendChild(title);
		let author = document.createElement("h2");
		author.className = "author";
		author.textContent = `${myLibrary[i].author}`;
		book.appendChild(author);
		let pages = document.createElement("h3");
		pages.className = "pages";
		pages.textContent = `${myLibrary[i].pages}`;
		book.appendChild(pages);
		let status = document.createElement("h4");
		status.className = "status";
		status.textContent = `${myLibrary[i].status}`;
		book.appendChild(status);
		let remove = document.createElement("h4");
		remove.className = "remove";
		remove.textContent = `Remove`;
		book.appendChild(remove);
	}
}
let web = new books("Web dev 102", "God", 999, "Not Read");
myLibrary.push(web);
displayBooks();
