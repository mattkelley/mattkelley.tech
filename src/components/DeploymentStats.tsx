import React, { Component } from 'react';
import fecha from 'fecha';
import { TravisCIService } from '../services/TravisCIService';
import humanizeDuration from 'humanize-duration';

export interface Props {
  branchName: string;
}

export interface State {
  isLoading: boolean;
  buildId: number;
  buildSha: string;
  buildNumber: string;
  buildDurationInMilliseconds: number;
  buildDate: string;
  compareUrl: string;
}

export default class TravisBuild extends Component<Props, State> {
  state: State = {
    isLoading: true,
    buildId: 0,
    buildSha: '',
    buildNumber: '',
    buildDurationInMilliseconds: 0,
    buildDate: '',
    compareUrl: ''
  };

  /**
   * Fetch stats about the latest build / deployment of this project
   * @param branchName - The name of the branch to fetch latest build stats
   */
  async getDeploymentStats(branchName: string) {
    try {
      const build = await TravisCIService.getLatestBuildByBranchName(branchName);
      const { commit } = build;

      this.setState(() => {
        return {
          isLoading: false,
          buildId: build.id,
          buildSha: commit.sha.slice(0, 7),
          buildNumber: build.number,
          buildDurationInMilliseconds: Number(build.duration) * 1000,
          buildDate: fecha.format(new Date(build.finished_at), 'MMMM Do, YYYY'),
          compareUrl: commit.compare_url
        };
      });
    } catch (err) {
      console.error('Could not fetch the latest deployment stats. Bummer!');
    }
  }

  componentDidMount() {
    this.getDeploymentStats(this.props.branchName);
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }
    const { buildId, buildSha, buildNumber, buildDurationInMilliseconds, buildDate, compareUrl } = this.state;
    const buildDuration = humanizeDuration(buildDurationInMilliseconds);
    const githubUrl = `https://github.com/mattkelley/mattkelley.tech/commit/${buildSha}`;
    const buildUrl = `https://travis-ci.com/mattkelley/mattkelley.tech/builds/${buildId}`;

    return (
      <section>
        <h3>And to get a little nerdy 👩‍💻</h3>
        <p>
          This application was tested, built and deployed from commit <a href={githubUrl}>{buildSha}</a>. It was
          published {buildDate} by TravisCI <a href={buildUrl}>job #{buildNumber}</a> in about {buildDuration}. If you
          are feeling curious, you can <a href={compareUrl}> compare changes</a> from the previous release.
        </p>
      </section>
    );
  }
}
