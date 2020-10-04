import React, { Component } from 'react';

class Posts extends Component {
  render() {
    return (
      <section className="Posts">
        {/* {this.props.error ? <p style={{ textAlign: 'center' }}>Error has occured and no posts avaliable at the moment</p> : posts} */}
        {posts}
      </section>
    );
  }
}

export default Posts;