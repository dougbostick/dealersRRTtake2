import React from "react";
import axios from "axios";

class PostForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
    this.create = this.create.bind(this);
  }
  async create(ev) {
    ev.preventDefault();
    console.log("before await", ev);
    const response = await axios.post("/api/students", {
      name: this.state.name,
    });
    const student = response.data;
    console.log("after await", student);
    // this.setState(student);
  }
  render() {
    const { name } = this.state;
    return (
      <form onSubmit={this.create}>
        <input
          value={name}
          onChange={(ev) => this.setState({ name: ev.target.value })}
        />
        <button>Submit</button>
      </form>
    );
  }
}

export default PostForm;

// {this.props.create(this.state.name)}
