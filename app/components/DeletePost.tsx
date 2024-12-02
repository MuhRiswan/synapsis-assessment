import { useDeletePost } from "@/hooks/usePosts";
import { DeleteFilled } from "@ant-design/icons";
import { Modal, Button, Spin, message } from "antd";
import { useState } from "react";

const DeletePost = ({ postId }: { postId: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deletePost, isPending: isLoading } = useDeletePost();

  const handleDelete = () => {
    deletePost(postId, {
      onSuccess: () => {
        setIsModalOpen(false);
        message.success(`Post deleted successfully`);
      },
      onError: (error) => {
        setIsModalOpen(false);
        message.error(`Failed to delete post: ${error.message}`);
        console.error("Error deleting post:", error.message);
      },
    });
  };

  return (
    <>
      <Button type="primary" danger onClick={() => setIsModalOpen(true)}>
        <DeleteFilled size={20} />
      </Button>
      <Modal
        title="Delete Post"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={() => setIsModalOpen(false)}
        okButtonProps={{ danger: true, disabled: isLoading }}
        okText={isLoading ? <Spin size="small" /> : "Delete"}
        cancelText="Cancel"
      >
        Are you sure you want to delete this post?
      </Modal>
    </>
  );
};

export default DeletePost;
