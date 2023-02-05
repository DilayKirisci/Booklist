// tab button
const fab = document.querySelector("#fab");
const attendee = document.querySelector("#attendee-name");
const modal = document.querySelector("#app-modal");
const form = document.querySelector("#attendee-form");
const list = document.querySelector("#list");

// const books = [
// 	// { name: "Anna Karanina" },
// 	// { name: "The Country of White Lilies" },
// 	localStorage.getItem("books")
// ];

let books = JSON.parse(localStorage.getItem("books") || "[]");
console.log("books", books);

const renderBooks = () => {
	const listElement = document.querySelector("#list");

	list.innerHTML = books
		.map((book) => {
			return `<li data-id=${book.id} class="deletable" tabindex="0">${book.name}</li>`;
		})
		.join("");
	// list.innerHTML = `
	// 	<li class="deletable" tabindex="0"></li>
	// 	<li class="deletable" tabindex="0"></li>
	// `;

	const listItems = document.querySelectorAll(".deletable");
	listItems.forEach((item) => {
		item.addEventListener("click", (event) => {
			// const bookName = event.currentTarget.textContent;
			const bookId = event.currentTarget.getAttribute("data-id");
			console.log("delete event", event);
			console.log("delete event id:", bookId);

			deleteBook(bookId);
		});
	});
};

const deleteBook = (bookId) => {
	console.log("deleteBooks calisiyor", bookId);
	const newBooks = books.filter((book) => {
		return book.id !== Number(bookId);
	});
	books = newBooks;
	console.log({
		books,
		newBooks,
	});
	localStorage.setItem("books", JSON.stringify(books));
	renderBooks();
};

const toggleModal = () => {
	modal.classList.toggle("show");
	fab.classList.toggle("rotate");
	if (modal.classList.contains("show")) {
		attendee.focus();
	} else {
		attendee.blur();
	}
};

const init = () => {
	fab.addEventListener("click", toggleModal);
	form.addEventListener("submit", (event) => {
		event.preventDefault();
		attendee.blur();
		console.log("event:", event);
		const newBook = {
			id: Math.floor(Math.random() * 10000000) + 1,
			name: attendee.value,
		};
		books.push(newBook);
		console.log("books", books);
		renderBooks();
		localStorage.setItem("books", JSON.stringify(books));
		attendee.value = "";
		modal.classList.remove("show");
	});
};

init();
renderBooks();

document.addEventListener("keyup", (event) => {
	const key = event.key;
	if (key === "n" && !modal.classList.contains("show")) {
		toggleModal();
	}
	if (key === "Escape" && modal.classList.contains("show")) {
		toggleModal();
	}
});
