import React from "react";
import { render } from "react-dom";
import axios from "axios";
import PostForm from "./PostForm";
import store from "./store";

class StudentList extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  async componentDidMount() {
    const studentRes = await axios.get("/api/students");
    console.log("studentRes", studentRes);
    const studentData = studentRes.data;
    this.setState({ students: studentData });
  }

  async deleteStudent(student) {
    await axios.delete(`/api/students/${student.id}`);
    const students = this.state.students.filter(
      (notDeleted) => notDeleted.id !== student.id
    );
    this.setState({ students });
  }

  render() {
    const studentEls = this.state.students.map((student) => {
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
        {/* <form method="POST">
          <input type="text" name="name"></input>
          <button>Submit</button>
        </form> */}
        <PostForm />
      </div>
    );
  }
}

render(<StudentList />, document.querySelector("#root"));
