"use client";

import React, { useState } from "react";
import { Modal, Button, Input, Form, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEditPost } from "@/hooks/usePosts";

export const EditPost = ({
  post,
}: {
  post: { id: number; title: string; body: string };
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate, isPending: isLoading } = useEditPost();
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue({ title: post.title, body: post.body });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: { title: string; body: string }) => {
    mutate(
      { id: post.id, ...values },
      {
        onSuccess: () => {
          message.success("Post updated successfully!");
          setIsModalOpen(false);
        },
        onError: (error) => {
          message.error((error as Error).message || "Failed to update post.");
        },
      }
    );
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <EditOutlined size={20} />
      </Button>
      <Modal
        title="Edit Post"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="edit_post"
          layout="vertical"
          initialValues={{ title: "", body: "" }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input placeholder="Enter the title..." />
          </Form.Item>

          <Form.Item
            label="Body"
            name="body"
            rules={[{ required: true, message: "Please input the body!" }]}
          >
            <Input.TextArea
              placeholder="Enter the body of the post..."
              rows={4}
            />
          </Form.Item>

          <div className="flex justify-end">
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};
