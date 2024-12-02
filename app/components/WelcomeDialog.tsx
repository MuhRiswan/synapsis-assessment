"use client";

import { Modal, Input, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const WelcomeDialog: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("go_rest_token");
    if (!token) {
      setDialogVisible(true);
    }
  }, []);

  const handleSubmit = async () => {
    if (!name || !token) {
      message.error("Name and token are required");
      return;
    }

    setLoading(true);
    const { data: isValid } = await axios
      .get(`/api/validate-token?token=${token}`)
      .catch(() => ({ data: false }));
    setLoading(false);

    if (isValid) {
      localStorage.setItem("go_rest_token", token);
      router.push("/posts");
      message.success(`Welcome, ${name}!`);
      setDialogVisible(false);
    } else {
      message.error("Invalid Go Rest Token");
    }
  };

  return (
    <Modal
      title={
        <h2 className="text-xl font-semibold text-center">
          Welcome to Go Rest API
        </h2>
      }
      open={isDialogVisible}
      onOk={handleSubmit}
      onCancel={(e) => e.preventDefault()}
      okText="Submit"
      cancelText="Cancel"
      cancelButtonProps={{ style: { display: "none" } }}
      closable={false}
      maskClosable={false}
      keyboard={false}
      confirmLoading={loading}
    >
      <div className="space-y-4">
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Enter your Go Rest Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default WelcomeDialog;
