import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

class Posts extends Component {
  state = {
    posts: [],
  }

  componentDidMount() {
    console.log(this.props);
    axios.get('/posts')
      .then(res => {
        const posts = res.data.slice(0, 4);
        const updatedPosts = posts.map(post => ({ ...post, author: 'Max' }));
        this.setState({
          posts: updatedPosts,
        });
      })
      .catch(err => {
        console.log(err);
        // this.setState({ error: true })
      });
  }

  postSelectedHandler = (id) => {
    this.setState({
      selectedPostId: id,
    });
  }

  render() {
    const posts = this.state.posts.map(post => {
      return (
        <Link key={post.id} to={`/posts/${post.id}`}>
          <Post
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        </Link>
      );
    });

    return (
      <div>
        <section className="Posts">
          {/* {this.props.error ? <p style={{ textAlign: 'center' }}>Error has occured and no posts avaliable at the moment</p> : posts} */}
          {posts}
        </section>
        <Route path={`${this.props.match.url}/:id`} exact component={FullPost} />
      </div>

    );
  }
}

export default Posts;