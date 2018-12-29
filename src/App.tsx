import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import BlogService from './services/BlogService';
import { GhostPost } from './dto/Blog';

// import './App.css';

interface State {
  loading: boolean;
  posts: GhostPost[];
}

class App extends Component {
  state: State = {
    loading: true,
    posts: []
  };

  componentDidMount() {
    BlogService.getPosts()
      .then(data => {
        this.setState(() => ({ posts: data.posts, loading: false }));
      })
      .catch(() => {
        this.setState(() => ({ loading: false }));
      });
  }

  render() {
    console.log(this.state.posts);
    return (
      <div className="App">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Matt Kelley | Software Engineer</title>
          <link rel="canonical" href="https://mattkelley.tech" />
        </Helmet>
        <header className="App-header">
          <h2 className="name">Matt Kelley</h2>
          <p>
            I am a software Engineer working at&nbsp;
            <a className="App-link" href="https://spanning.com" target="_blank" rel="noopener noreferrer">
              Spanning
            </a>
          </p>
        </header>
        {this.state.posts.map(post => {
          return (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.plaintext}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
