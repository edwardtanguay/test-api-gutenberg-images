import { useState, useEffect } from 'react';
import axios from 'axios';

const booksUrl = 'https://gutendex.com/books/?search=nietzsche';

export const PageBooks = () => {
	const [bookData, setBookData] = useState({ count: 0 });

	useEffect(() => {
		(async () => {
			const response = await axios(booksUrl);
			const _bookData = response.data;
			setBookData(_bookData);
		})();
	}, []);

	return (
		<div className="page_books">
			<h2>Books</h2>
			{bookData.count > 0 ? (
				<p>There are {bookData.count} books.</p>
			) : (
				<div className="waitText">Loading...</div>
			)}
		</div>
	);
};
