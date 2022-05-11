import { useState, useEffect } from 'react';
import axios from 'axios';

const booksUrl = 'https://gutendex.com/books/?search=berlin';

// interface
const book = {
	title: 'ttt',
	author: 'aaa',
	readUrl: 'uuu',
	imageUrl: 'uuu',
};

export const PageBooks = () => {
	const [books, setBooks] = useState([]);

	const createBooks = (bookData) => {
		const _books = [];

		const getReadUrl = (book) => {
			let r = '';
			const entries = Object.entries(book.formats);
			entries.forEach((entry) => {
				const key = entry[0];
				const value = entry[1];
				if (key.includes('text/html')) {
					r = value;
				}
			});
			return r;
		};

		bookData.results.forEach((book) => {
			_books.push({
				title: book.title,
				author: book.authors[0].name,
				readUrl: getReadUrl(book),
			});
		});
		setBooks(_books);
	};

	useEffect(() => {
		(async () => {
			const response = await axios(booksUrl);
			const bookData = response.data;
			createBooks(bookData);
		})();
	}, []);

	return (
		<div className="page_books">
			<h2>Books</h2>
			{books.length > 0 ? (
				<>
					<div className="books">
						<p>There are {books.length} books.</p>
						{books.map((book, index) => {
							return (
								<div key={index} className="book">
									<div className="title"><a href={book.readUrl} target="_blank">{book.title}</a></div>
									<div className="author">{book.author}</div>
								</div>
							);
						})}
					</div>
				</>
			) : (
				<div className="waitText">Loading...</div>
			)}
		</div>
	);
};
