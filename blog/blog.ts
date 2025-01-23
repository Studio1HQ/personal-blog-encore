import { api, APIError } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const db = new SQLDatabase("blogs", { migrations: "./migrations" });

interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
}

interface CreateBlogParams {
  title: string;
  content: string;
  author: string;
}

interface UpdateBlogParams {
  id: number;
  title: string;
  content: string;
}

// Create Blog
export const createBlog = api<CreateBlogParams, Blog>(
  {
    method: "POST",
    path: "/blogs",
    expose: true,
  },
  async ({ title, content, author }: CreateBlogParams): Promise<Blog> => {
    const row = await db.queryRow<Blog>`
      INSERT INTO blogs (title, content, author)
      VALUES (${title}, ${content}, ${author})
      RETURNING id, title, content, author, created_at, updated_at`;

    if (!row) {
      throw APIError.internal("Failed to create blog");
    }
    return row;
  }
);

// Read All Blogs
export const getBlogs = api(
  {
    method: "GET",
    path: "/blogs",
    expose: true,
  },
  async (): Promise<{ blogs: Blog[] }> => {
    const rows = db.query`
          SELECT id, title, content, created_at
          FROM blogs
          ORDER BY created_at DESC
      `;

    console.log(rows);

    const blogs: Blog[] = [];
    for await (const row of rows) {
      blogs.push({
        id: row.id,
        title: row.title,
        content: row.content,
        author: row.author,
        created_at: row.created_at,
        updated_at: row.updated_at,
      });
    }

    return { blogs };
  }
);

// Read a Single Blog by ID
export const getBlogById = api<{ id: number }, Blog>(
  {
    method: "GET",
    path: "/blogs/:id",
    expose: true,
  },
  async ({ id }: { id: number }): Promise<Blog> => {
    const row = await db.queryRow<Blog>`
      SELECT * FROM blogs WHERE id = ${id}`;
    if (!row) {
      throw APIError.notFound("Blog not found");
    }
    return row;
  }
);

// Update Blog
export const updateBlog = api<UpdateBlogParams, Blog>(
  {
    method: "PUT",
    path: "/blogs/:id",
    expose: true,
  },
  async ({ id, title, content }: UpdateBlogParams): Promise<Blog> => {
    const row = await db.queryRow<Blog>`
      UPDATE blogs
      SET title = ${title}, content = ${content}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, title, content, author, created_at, updated_at`;

    if (!row) {
      throw APIError.notFound("Blog not found");
    }
    return row;
  }
);

// Delete Blog
export const deleteBlog = api<{ id: number }, { message: string }>(
  {
    method: "DELETE",
    path: "/blogs/:id",
    expose: true,
  },
  async ({ id }: { id: number }): Promise<{ message: string }> => {
    const row = await db.queryRow<Blog>`
    SELECT * FROM blogs WHERE id = ${id}`;
    if (!row) {
      throw APIError.notFound("Blog not found");
    }

    await db.exec`DELETE FROM blogs WHERE id = ${id}`;

    return { message: "Blog deleted successfully" };
  }
);
