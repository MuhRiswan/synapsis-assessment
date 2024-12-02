import Search from "../components/Search";
import PostList from "../components/PostList";
import { CreatePost } from "../components/CreatePost";

export default async function PostsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const searchQuery = searchParams?.query || "";
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Rest API - Posts</h1>
      <div className="flex items-center justify-between gap-1 mb-5">
        <Search />
        <CreatePost />
      </div>
      <PostList query={searchQuery} />
    </div>
  );
}
