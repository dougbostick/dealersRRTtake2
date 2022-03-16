import React from "react";
import { render } from "react-dom";
import axios from "axios";

class StudentList extends React.Component {
  constructor() {
    super();
    this.state = {
      students: [],
    };
  }
  async componentDidMount() {
    const studentRes = await axios.get("/api/students");
    console.log("studentRes", studentRes);
    const studentData = studentRes.data;
    this.setState({ students: studentData });
  }

  //add a post component here

  render() {
    const studentEls = this.state.students.map((student) => {
      return (
        <li key={student.id}>
          {student.name}, {student.year}, {student.subject.name}
        </li>
      );
    });
    return (
      <div>
        <h1>Students</h1>
        <ul>{studentEls}</ul>
      </div>
    );
  }
}

render(<StudentList />, document.querySelector("#root"));
