import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  state = {
    lodadedPost: null,
  }

  componentDidUpdate() {
    if (this.props.id) {
      if (!this.state.lodadedPost || (this.state.lodadedPost && this.state.lodadedPost.id !== this.props.id)) {
        axios.get(`/posts/${this.props.id}`)
          .then(res => this.setState({
            lodadedPost: res.data
          }));
      }
    } 
  }

  deletePostHandler = () => {
    axios.delete(`/posts/${this.props.id}`)
      .then(res => console.log(res));
  }

  render() {
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;

    if (this.props.id) post = <p style={{ textAlign: "center" }}>Loading...</p>;

    if (this.state.lodadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.lodadedPost.title}</h1>
          <p>{this.state.lodadedPost.body}</p>
          <div className="Edit">
            <button onClick={this.deletePostHandler} className="Delete">Delete</button>
          </div>
        </div>
      );
    }

    return post;
  }
}

export default FullPost;