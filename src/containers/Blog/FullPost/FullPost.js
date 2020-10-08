import React, { Component } from 'react';
import axios from '../../../axios';

import './FullPost.css';

class FullPost extends Component {
  state = {
    lodadedPost: null,
  }

  componentDidMount() {
    console.log(this.props);
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  deletePostHandler = () => {
    axios.delete(`/posts/${this.props.match.params.id}`)
      .then(res => console.log(res));
  }

  loadData() {
    if (this.props.match.params.id) {
      if (!this.state.lodadedPost || (this.state.lodadedPost && this.state.lodadedPost.id !== Number(this.props.match.params.id))) {
        axios.get(`/posts/${this.props.match.params.id}`)
          .then(res => this.setState({
            lodadedPost: res.data
          }));
      }
    }
  }

  render() {
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;

    if (this.props.match.params.id) post = <p style={{ textAlign: "center" }}>Loading...</p>;

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