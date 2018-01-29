export function selectBook(book) {
  // selectBook is an ActionCreator and
  // must return an object with a type property
  return {
    type: 'BOOK_SELECTED', // always has type -> pull to constant later
    payload: book // sometimes has payload
  };
}
