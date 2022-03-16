import React from "react";
import axios from "axios";

class PostForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }
  async create(name) {
    const student = await axios.post(("/api/students", { name })).data;
    console.log(student);
    this.setState(student);
  }
  render() {
    const { name } = this.state;
    return (
      <form>
        <input
          value={name}
          onChange={(ev) => this.setState({ name: ev.target.value })}
        />
        <button onClick={() => this.create(this.state.name)}>Submit</button>
      </form>
    );
  }
}

export default PostForm;
