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
			return 'nnn';
		}
		bookData.results.forEach(book => {
			_books.push(
				{
					title: book.title,
					author: book.authors[0].name,
					readUrl: getReadUrl(book)
				}
			)
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
									<div className="title">{book.title}</div>
									<div className="author">{book.author}</div>
									<div className="test">{book.readUrl}</div>
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
