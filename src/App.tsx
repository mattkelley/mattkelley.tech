import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Blog from './services/BlogService';
// import TravisCI from './services/TravisCIService';
import { GhostPost } from './dto/Blog';
import TravisBuild from './TravisBuild';
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
    Blog.getPosts()
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
          <div className="name-wrapper">
            <h2 className="name">Matt Kelley</h2>
          </div>
          <p>
            I am a software engineer working at&nbsp;
            <a className="App-link" href="https://spanning.com" target="_blank" rel="noopener noreferrer">
              Spanning
            </a>
            &nbsp;on the Office 365 backup team. Ut rhoncus porta est eu maximus. Maecenas in tempor enim. Vestibulum
            blandit, nibh eget consectetur congue, lectus diam venenatis dolor, vitae commodo ex ipsum eu leo. Cras
            iaculis dolor vel felis porttitor, ut fermentum sapien eleifend.
          </p>
        </header>
        <TravisBuild />
        {/* {this.state.posts.map(post => {
          return (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.plaintext}</p>
            </div>
          );
        })} */}
      </div>
    );
  }
}

export default App;
