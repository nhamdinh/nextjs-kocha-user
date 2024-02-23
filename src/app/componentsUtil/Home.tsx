"use client";
import React, { useState } from "react";
import { Button } from "antd";
import CreateUser from "./modalCustomize/CreateUser";

const Home = (props: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div className="mt20px">
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <CreateUser
        isModalOpen={isModalOpen}
        cb_setIsModalOpen={(val: any) => {
          setIsModalOpen(val);
        }}
      ></CreateUser> */}
    </div>
  );
};
export default Home;
