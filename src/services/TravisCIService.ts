// Travis requires "/" to be encoded
const slug = encodeURIComponent('mattkelley/mattkelley.tech');

// The branch that causes production deployments
const branch = 'develop';

// Using version 3 of the Travis public API
const headers = {
  'Travis-API-Version': '3'
};

export default class TravisCIService {
  /**
   * Get information about the last build on develop branch and include meta about the commit
   */
  public static async getLatestDeployment() {
    const url = `https://api.travis-ci.com/repo/${slug}/branch/${branch}?include=build.commit`;
    try {
      const req = await fetch(url, { headers });
      const data = await req.json();
      return data.last_build;
    } catch (err) {
      console.error('Could not request latest deployment data from TravisCI');
      throw err;
    }
  }
}
