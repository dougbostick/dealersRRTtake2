import React from "react";
import { render } from "react-dom";
import axios from "axios";
import PostForm from "./PostForm";
import store from "./store";
import { connect, Provider } from "react-redux";

class StudentList extends React.Component {
  // constructor() {
  //   super();
  //   this.state = store.getState();
  // }

  async componentDidMount() {
    const studentRes = await axios.get("/api/students");
    //console.log("studentRes", studentRes);
    const studentData = studentRes.data;
    store.dispatch({ type: "STUDENTS", students: studentData });
    //store.subscribe(() => this.setState(store.getState()));
  }

  async deleteStudent(student) {
    await axios.delete(`/api/students/${student.id}`);
    const students = this.props.students.filter(
      (notDeleted) => notDeleted.id !== student.id
    );
    this.setState({ students });
  }

  render() {
    // console.log("student list state", this.state);
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
// const mapDispatch = () => {};

const ConnectedSL = connect(mapState, null)(StudentList);

render(
  <Provider store={store}>
    <ConnectedSL />
  </Provider>,
  document.querySelector("#root")
);
