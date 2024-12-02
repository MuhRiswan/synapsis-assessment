"use client";
import { Card, Pagination } from "antd";
import Meta from "antd/es/card/Meta";
import { usePosts } from "@/hooks/usePosts";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";
import DeletePost from "./DeletePost";
import { EditPost } from "./EditPost";
import { useRouter } from "next/navigation";

const PostList = ({ query }: { query: string }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedQuery = useDebounce(query, 500);

  const { data, isLoading, isError, error } = usePosts(
    debouncedQuery,
    currentPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error loading posts: {error.message}</p>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.data.length > 0 ? (
          data?.data.map((post: any) => (
            <Card
              loading={isLoading}
              key={post.id}
              className="border border-gray-200 pb-6 rounded h-full max-h-96 relative"
            >
              <Meta
                title={
                  <h3
                    className="text-lg font-semibold ant-card-meta-title cursor-pointer"
                    onClick={() => router.push(`/posts/${post.id}`)}
                  >
                    {post.title}
                  </h3>
                }
                description={
                  <p className="text-gray-600 line-clamp-4">{post.body}</p>
                }
              />
              <div className="absolute bottom-0 right-0 p-2">
                <div className="flex justify-center gap-1">
                  <EditPost
                    post={{ id: post.id, title: post.title, body: post.body }}
                  />
                  <DeletePost postId={post.id} />
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="flex justify-center items-center col-span-full">
            <p>No posts found.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {data?.data.length > 0 && (
        <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={data?.meta?.pagination?.per_page || 10}
            total={data?.meta?.pagination?.total || 0}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default PostList;
