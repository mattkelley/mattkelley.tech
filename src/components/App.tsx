import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import DeploymentStats from './DeploymentStats';
import GetInTouch from './GetInTouch';

// Config / ENV ?
const githubUrl = 'https://github.com/mattkelley';
const linkedinUrl = 'https://www.linkedin.com/in/mjk000';
const emailAddress = 'mk@mattkelley.tech';
const branchName = 'develop';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Matt Kelley | Software Engineer</title>
          <link rel="canonical" href="https://mattkelley.tech" />
        </Helmet>
        <header className="app-header">
          <div className="name-wrapper">
            <h2 className="name">Matt Kelley</h2>
          </div>
          <p>
            I am a software engineer working at&nbsp;
            <a className="App-link" href="https://spanning.com" target="_blank" rel="noopener noreferrer">
              Spanning Cloud Apps
            </a>
            &nbsp;on the Office 365 backup team. As an experienced individual contributor I value simple, creative
            solutions to complex problems. I'm inspired by collaborative teammates, open communication and fast paced
            environments.
          </p>
          <p>
            AFK I love to ski, go on <a href={`${process.env.PUBLIC_URL}/adventure.jpg`}>adventures</a>, take care of my{' '}
            <a href={`${process.env.PUBLIC_URL}/plant.jpg`}>plants</a>, and hangout with my dog{' '}
            <a href={`${process.env.PUBLIC_URL}/judy.jpg`}>Judy</a>.
          </p>
        </header>
        <GetInTouch {...{ githubUrl, linkedinUrl, emailAddress }} />
        <DeploymentStats {...{ branchName }} />
      </div>
    );
  }
}

export default App;
