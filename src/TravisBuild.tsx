import React, { Component } from 'react';
import fecha from 'fecha';
import TravisCI from './services/TravisCIService';
import { string } from 'prop-types';
const humanizeDuration = require('humanize-duration');

export interface Props {}

export interface State {
  id: number;
  isLoading: boolean;
  duration: number;
  finished_at: string;
  number: string;
  sha: string;
  compare_url: string;
}

export interface Commit {
  author: {
    name: string;
    avatar_url: string;
  };
  committer: {
    avatar_url: string;
    name: string;
  };
  committed_at: string;
  compare_url: string;
  id: number;
  message: string;
  ref: string;
  sha: string;
}

export interface Build {
  '@href': string;
  duration: number;
  event_type: string;
  finished_at: string;
  id: number;
  number: string;
  pull_request_number: string | null;
  pull_request_title: string | null;
  started_at: string;
  state: string;
  commit: Commit;
}

export default class TravisBuild extends Component<Props, State> {
  state: State = {
    isLoading: true,
    id: 0,
    duration: 0,
    finished_at: '',
    number: '',
    sha: '',
    compare_url: ''
  };

  componentDidMount() {
    TravisCI.getLatestDeployment().then((data: Build) => {
      console.log(data['@href']);

      const { id, duration, finished_at, number, commit } = data;
      const { sha, compare_url } = commit;
      this.setState(() => ({ isLoading: false, id, duration, finished_at, number, sha, compare_url }));
    });
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }
    const { id, duration, finished_at, number, sha, compare_url } = this.state;
    // Shorten the commit sha for presentation
    const shaFormatted = this.state.sha.slice(0, 7);
    // humanizeDuration assumes milliseconds and the travis duration is expressed in seconds
    const durationFormatted = humanizeDuration(Number(duration) * 1000);
    const githubSHALink = `https://github.com/mattkelley/mattkelley.tech/commit/${sha}`;
    const publishedFormatted = fecha.format(new Date(finished_at), 'dddd MMMM Do, YYYY');
    const travisUrl = `https://travis-ci.com/mattkelley/mattkelley.tech/builds/${id}`;

    return (
      <div>
        <p>
          To get all 👩‍💻.. this page was built by commit <a href={githubSHALink}>{shaFormatted}</a>. It was built{' '}
          {publishedFormatted} by TravisCI <a href={travisUrl}>job #{number}</a> in {durationFormatted}. If for some
          reason you are interested, you can
          <a href={compare_url}> compare changes</a> from the previous release.
        </p>
        <p>Get in touch!</p>
        <ul>
          <li>
            <a href="">LinkedIn</a>
          </li>
          <li>
            <a href="https://github.com/mattkelley">Github</a>
          </li>
          <li>mk@mattkelley.tech</li>
        </ul>
      </div>
    );
  }
}
