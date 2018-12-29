export interface GhostPost {
  author: string;
  comment_id: string;
  created_at: string;
  created_by: string;
  custom_excerpt: string | null;
  custom_template: string | null;
  feature_image: string;
  featured: boolean;
  html?: string;
  id: string;
  locale: string | null;
  meta_description: string | null;
  meta_title: string | null;
  og_description: string | null;
  og_image: string | null;
  og_title: string | null;
  page: boolean;
  primary_author: string | null;
  primary_tag: string | null;
  plaintext: string;
  published_at: string;
  published_by: string;
  slug: string;
  status: string;
  title: string;
  twitter_description: string | null;
  twitter_image: string | null;
  twitter_title: string | null;
  updated_at: string;
  updated_by: string;
  url: string;
  uuid: string;
  visibility: string;
}

export interface GhostError {
  message: string;
  errorType: string;
}

export interface GhostPagination {
  limit: number;
  next: number | null;
  page: number;
  pages: number;
  prev: number | null;
  total: number;
}

export interface GetPostsDTO {
  errors?: GhostError[];
  meta: GhostPagination;
  posts: Post[];
}

export interface GetPostByIdDTO {
  errors?: GhostError[];
  posts: Post[];
}
