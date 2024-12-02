import axios from "axios";

export async function getPosts({
  query,
  currentPage = 1,
}: {
  query?: string;
  currentPage?: number;
}) {
  const token = localStorage.getItem("go_rest_token");

  if (!token) {
    throw new Error("Token not found. Please log in.");
  }

  const apiUrl = `https://gorest.co.in/public/v1/posts?page=${currentPage}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data;
    let results = data.data; // Assuming posts are in `data.data`

    // Filter by query if provided
    if (query) {
      results = results.filter((post: any) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    return {
      data: results,
      meta: data.meta, // Metadata for pagination
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
}

export async function fetchPostDetails(postId: number) {
  const token = localStorage.getItem("go_rest_token");

  if (!token) {
    throw new Error("Token not found. Please log in.");
  }

  const apiUrl = `https://gorest.co.in/public/v1/posts/${postId}`;
  try {
    const response = await axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching post details:", error);
    throw new Error("Failed to fetch post details.");
  }
}

// Fetch user details by ID
export async function fetchUserDetails(userId: number) {
  const token = localStorage.getItem("go_rest_token");

  if (!token) {
    throw new Error("Token not found. Please log in.");
  }

  const apiUrl = `https://gorest.co.in/public/v1/users/${userId}`;
  try {
    const response = await axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw new Error("Failed to fetch user details.");
  }
}

export async function createPost(title: string, body: string, userId: number) {
  const token = localStorage.getItem("go_rest_token");

  if (!token) {
    throw new Error("Token not found. Please log in.");
  }

  const apiUrl = "https://gorest.co.in/public/v1/posts";

  try {
    const response = await axios.post(
      apiUrl,
      { title, body, user_id: userId }, // Tambahkan user_id di sini
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post.");
  }
}

export async function editPost(id: number, title: string, body: string) {
  const token = localStorage.getItem("go_rest_token");

  if (!token) {
    throw new Error("Token not found. Please log in.");
  }

  const apiUrl = `https://gorest.co.in/public/v1/posts/${id}`;

  try {
    const response = await axios.put(
      apiUrl,
      { title, body },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error editing post:", error);
    throw new Error("Failed to edit post.");
  }
}

export async function deletePost(postId: number) {
  const token = localStorage.getItem("go_rest_token");

  if (!token) {
    throw new Error("Token not found. Please log in.");
  }

  const apiUrl = `https://gorest.co.in/public/v1/posts/${postId}`;

  try {
    const response = await axios.delete(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Failed to delete post.");
  }
}
