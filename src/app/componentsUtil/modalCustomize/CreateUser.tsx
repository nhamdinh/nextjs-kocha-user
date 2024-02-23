"use client";
import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import { Form, Input } from "antd";
import { createUser } from "@/apis/apisUser";

type FieldType = {
  name?: string;
  email?: string;
};

const CreateUser = ({ isModalOpen, cb_setIsModalOpen }: any) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleOk = () => {
    cb_setIsModalOpen(false);
  };

  const handleCancel = () => {
    cb_setIsModalOpen(false);
  };

  const onFinish = async (values: any) => {
    // console.log("Success:", values);
    const res = await createUser(values);
    if (res?.id) {
      messageApi.open({
        type: "success",
        content: "thanh cong",
      });
      cb_setIsModalOpen(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="CreateUser"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          {/*         <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default CreateUser;
