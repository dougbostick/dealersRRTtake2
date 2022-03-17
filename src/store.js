import { createStore, applyMiddleware } from "redux";
import thunks from "redux-thunk";
import axios from "axios";

export const getStudents = () => {
  return async (dispatch) => {
    try {
      const studentRes = await axios.get("/api/students");
      const studentData = studentRes.data;
      store.dispatch({ type: "STUDENTS", students: studentData });
    } catch (err) {
      console.log(err);
    }
  };
};
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

const store = createStore(reducer, applyMiddleware(thunks));

export default store;
