"use client";

import React, { useState } from "react";
import { Modal, Button, Input, Form, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCreatePost } from "@/hooks/usePosts";

export const CreatePost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate, isPending: isLoading } = useCreatePost();
  const [form] = Form.useForm();

  const onFinish = (values: { title: string; body: string }) => {
    mutate(
      { ...values, userId: 7546490 },
      {
        onSuccess: () => {
          message.success("Post created successfully!");
          form.resetFields();
          setIsModalOpen(false);
        },
        onError: (error) => {
          message.error((error as Error).message || "Failed to create post.");
        },
      }
    );
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center justify-center px-3 py-1.5 gap-1 text-sm font-semibold"
      >
        Create Post
      </Button>
      <Modal
        title="Create Post"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          name="create_post"
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
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
            >
              {isLoading ? "Creating..." : "Create Post"}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};
