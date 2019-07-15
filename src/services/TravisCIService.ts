export interface TravisCICommit {
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

export interface TravisCIBuild {
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
  commit: TravisCICommit;
}

// The Github repo
const REPO = 'mattkelley/mattkelley.tech';

export class TravisCIService {
  static Headers = {
    'Travis-API-Version': '3'
  };

  /**
   * Get information about the latest Travis CI build by branch name and include meta about the commit.
   * @param branchName - The name of the branch
   */
  public static async getLatestBuildByBranchName(branchName: string): Promise<TravisCIBuild> {
    const slug = encodeURIComponent(REPO);
    const url = `https://api.travis-ci.com/repo/${slug}/branch/${branchName}?include=build.commit`;
    try {
      const req = await fetch(url, { headers: TravisCIService.Headers });
      const data = await req.json();
      return data.last_build;
    } catch (err) {
      console.error('Could not request latest deployment data from TravisCI', err);
      throw err;
    }
  }
}
