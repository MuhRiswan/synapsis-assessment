"use client";

import { useParams, useRouter } from "next/navigation";
import { Button, Spin } from "antd";
import { usePostDetails, useUserDetails } from "@/hooks/usePosts";
import { ArrowLeftOutlined } from "@ant-design/icons";

const PostDetailsPage = () => {
  const { postId } = useParams();
  const router = useRouter();
  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = usePostDetails(Number(postId));
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUserDetails(post?.user_id);

  if (isPostLoading || isUserLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between">
        <Button
          type="primary"
          size="small"
          icon={<ArrowLeftOutlined />}
          onClick={() => router.back()}
          className="mb-4"
        >
          Back
        </Button>
      </div>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 text-lg mb-6">{post.body}</p>
      <div className="border-t pt-4">
        <h2 className="text-2xl font-semibold mb-2">Author Information</h2>
        {isUserError ? (
          <p className="text-red-500">User details not found</p>
        ) : (
          user && (
            <>
              <p className="text-gray-700 text-base mb-2">Name: {user.name}</p>
              <p className="text-gray-700 text-base mb-2">
                Email: {user.email}
              </p>
              <p className="text-gray-700 text-base mb-2">
                Gender: {user.gender}
              </p>
              <p className="text-gray-700 text-base mb-2">
                Status: {user.status}
              </p>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default PostDetailsPage;
