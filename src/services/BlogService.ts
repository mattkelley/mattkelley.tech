import * as queryString from 'query-string';
import { GhostPost, GetPostsDTO, GetPostByIdDTO } from '../dto/Blog';

export default class BlogService {
  private static API_URL = `${process.env.REACT_APP_BLOG_URL}/ghost/api/v0.1`;
  private static CLIENT_ID = `${process.env.REACT_APP_BLOG_CLIENT_ID}`;
  private static CLIENT_SECRET = `${process.env.REACT_APP_BLOG_SECRET_ID}`;

  /**
   *
   */
  private static requestUrl(path: string, queryParams?: { [key: string]: any }): string {
    const searchParams = queryString.stringify({
      ...queryParams,
      client_id: BlogService.CLIENT_ID,
      client_secret: BlogService.CLIENT_SECRET
    });
    return `${BlogService.API_URL}${path}?${searchParams}`;
  }

  /**
   * Get all posts from Ghost blog
   */
  static async getPosts(): Promise<GetPostsDTO> {
    try {
      const url = BlogService.requestUrl('/posts', { formats: ['plaintext'] });
      const request = await fetch(url);
      return await request.json();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  /**
   * Get a single Ghost blog post by ID
   * @param id - The post id
   * @returns - a single post if it exists
   */
  static async getPostById(id: string): Promise<GhostPost> {
    const path = `/posts/${id}/`;
    const url = BlogService.requestUrl(path, { formats: ['plaintext'] });
    try {
      const req = await fetch(url);
      const res: GetPostByIdDTO = await req.json();
      if (res.errors) {
        const [err] = res.errors;
        throw new Error(`${err.message} Could not GET ${path}`);
      }
      // For some reason, Ghost API returns the requested post in an array, just return the post
      return res.posts[0];
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
