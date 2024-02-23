"use client";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";

const items: MenuProps["items"] = [
  {
    label: <Link href={'/'}>Navigation Home</Link>,
    key: "home",
    icon: <SettingOutlined />,
  },
  {
    label: <Link href={'/users'}>Navigation Users</Link>,
    key: "mail",
    icon: <MailOutlined />,
  },
  {
    label: <Link href={'/login'}>Navigation Login</Link>,
    key: "app",
    icon: <AppstoreOutlined />,
    disabled: false,
  },
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState("home");

  const onClick: MenuProps["onClick"] = (e) => {
    // console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
