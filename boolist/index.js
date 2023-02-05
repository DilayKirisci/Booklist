// DOM ELEMENTS

const imgss = document.querySelectorAll(".card-img-top");
const cardTitless = document.querySelectorAll(".card-title");
const cardTextss = document.querySelectorAll(".card-text");
const listItemss = document.querySelectorAll(".list-group-item");
const bookLink = document.querySelectorAll(".card-link");

// API REQUEST
const URL =
	"https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=vIHARfWnFIauPL4ajpDjo9mf9tXuA2nU";

fetch(URL)
	.then((response) => response.json())
	.then((data) => {
		data.results.books.forEach((book, index) => {
			imgss[index].src = book.book_image;
			cardTextss[index].textContent = book.author;
			bookLink[index].href = book.amazon_product_url;
			listItemss[index].textContent = book.rank;
			cardTitless[index].textContent = book.title;
		});
	});
