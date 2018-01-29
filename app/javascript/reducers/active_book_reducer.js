// state argument is not application state
// only the state this reducer is responsible for
// default state to null to avoid undefined
export default function(state = null, action){
  // state += 1

  switch(action.type) {
  case 'BOOK_SELECTED':
    return action.payload;
  }

  // must return non undefined
  // and never mutate state, always fressh object
  return state;
}
