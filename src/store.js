import { createStore } from "redux";

const getStudents = () => {
  return {};
};

const STUDENTS = "STUDENTS";

const initialState = { students: [] };
const reducer = (initialState, action) => {
  switch (action.type) {
    case STUDENTS:
      return action;
  }
  return initialState;
};

const store = createStore(reducer);

export default store;
