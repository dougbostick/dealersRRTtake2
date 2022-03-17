import React from "react";
import { render } from "react-dom";
import axios from "axios";
import PostForm from "./PostForm";
import store from "./store";
import { connect, Provider } from "react-redux";
import { getStudents } from "./store";

class StudentList extends React.Component {
  async componentDidMount() {
    this.props.fetchStudents();
  }

  async deleteStudent(student) {
    await axios.delete(`/api/students/${student.id}`);
    const students = this.props.students.filter(
      (notDeleted) => notDeleted.id !== student.id
    );
    this.setState({ students });
  }

  render() {
    const studentEls = this.props.students.map((student) => {
      return (
        <li key={student.id}>
          {student.name}, {student.year}
          <button onClick={() => this.deleteStudent(student)}>X</button>
        </li>
      );
    });
    return (
      <div>
        <h1>Students</h1>
        <ul>{studentEls}</ul>
        <PostForm />
      </div>
    );
  }
}

const mapState = (reduxState) => {
  return {
    students: reduxState.students,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchStudents: () => dispatch(getStudents()),
  };
};

const ConnectedSL = connect(mapState, mapDispatch)(StudentList);

render(
  <Provider store={store}>
    <ConnectedSL />
  </Provider>,
  document.querySelector("#root")
);
