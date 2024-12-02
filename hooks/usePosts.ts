import {
  createPost,
  deletePost,
  editPost,
  fetchPostDetails,
  fetchUserDetails,
  getPosts,
} from "@/lib/data";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

export const usePosts = (query?: string, currentPage = 1) => {
  const queryOptions: UseQueryOptions<
    unknown,
    Error,
    { data: any; meta: any }
  > = {
    queryKey: ["posts", query, currentPage],
    queryFn: () => getPosts({ query, currentPage }),
  };

  return useQuery(queryOptions);
};

export const usePostDetails = (postId: number) => {
  return useQuery({
    queryKey: ["postDetails", postId],
    queryFn: () => fetchPostDetails(postId),
    enabled: !!postId, // Only fetch when postId is valid
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });
};

// Hook for fetching user details
export const useUserDetails = (userId: number) => {
  return useQuery({
    queryKey: ["userDetails", userId],
    queryFn: () => fetchUserDetails(userId),
    enabled: !!userId, // Only fetch when userId is valid
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: { title: string; body: string; userId: number }) =>
      createPost(post.title, post.body, post.userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useEditPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: { id: number; title: string; body: string }) =>
      editPost(post.id, post.title, post.body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
