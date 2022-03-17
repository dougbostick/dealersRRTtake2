import { createStore, applyMiddleware } from "redux";
import reduxLogger from "redux-logger";

// const getStudents = () => {
//   return {
//     type: STUDENTS,
//     action: [{ name: "doug", year: "freshman" }],
//   };
// };

const STUDENTS = "STUDENTS";

const initialState = { students: [] };
const reducer = (state = initialState, action) => {
  console.log("action", action);
  switch (action.type) {
    case STUDENTS:
      state = { ...state, students: action.students };
      console.log("store state", state);
      return state;
  }
  return state;
};

const store = createStore(reducer, applyMiddleware(reduxLogger));

export default store;
