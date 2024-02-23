"use client";
import React, { useState, useEffect } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import AppPagination from "@/app/componentsUtil/AppPagination";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button, Modal, message } from "antd";
import CreateUser from "@/app/componentsUtil/modalCustomize/CreateUser";
import { DeleteTwoTone, FireTwoTone } from "@ant-design/icons";
import { deleteUser, getUserById } from "@/apis/apisUser";
import UpdateUser from "@/app/componentsUtil/modalCustomize/UpdateUser";
interface DataType {
  id: string;
  // name: string;
  // age: number;
  // address: string;
  // tags: string[];
}

const Users = (props: any) => {
  const { users, metadata } = props;
  const { totalCount, currentPage, PAGE_SIZE } = metadata ?? 1;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState<any>(false);

  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const [params, setParams] = useState<any>({
    limit: PAGE_SIZE, //10
    offset: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (users) setIsLoading(false);
  }, [users]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      render: (id: any) => {
        return (
          <div className="df gap20px">
            <div
              className="cursor__pointer"
              onClick={async () => {
                const res = await deleteUser({ id });
                // console.log(res);
              }}
            >
              <DeleteTwoTone />
            </div>
            <div
              className="cursor__pointer"
              onClick={async () => {
                const res = await getUserById({ id });
                if (res?.id) {
                  setUser(res);
                  setIsModalOpenUpdate(true);
                }
              }}
            >
              <FireTwoTone />
            </div>
          </div>
        );
      },
    },
  ];

  const data: DataType[] = [...users];

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="mt20px">
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <UpdateUser
        user={user}
        isModalOpen={isModalOpenUpdate}
        cb_setIsModalOpen={(val: any) => {
          setIsModalOpenUpdate(val);
        }}
      ></UpdateUser>
      <CreateUser
        isModalOpen={isModalOpen}
        cb_setIsModalOpen={(val: any) => {
          setIsModalOpen(val);
        }}
      ></CreateUser>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey={(record) => `${record?.id}`}
        pagination={false}
        rowSelection={{
          type: "checkbox",
          selectedRowKeys: selectedRows.map((item) => `${item.id}`),
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
          getCheckboxProps: (record) => ({
            name: record?.id,
            value: `${record?.id}`,
          }),
        }}
        locale={{ emptyText: "nodata" }}
        // scroll={{
        //   y: `calc(100vh - ${offsetHeight}px)`,
        //   scrollToFirstRowOnChange: true,
        // }}
      />
      <AppPagination
        totalCount={totalCount}
        params={params}
        currentPage={currentPage}
        cb_setCurrentPage={(page: any) => {
          setIsLoading(true);
          const __searchParams = new URLSearchParams(searchParams);
          __searchParams.set("page", page);
          router.replace(`${pathname}?${__searchParams.toString()}`);
        }}
        cb_setParams={() => {}}
        cb_setGoSearch={() => {}}
      ></AppPagination>
    </div>
  );
};

export default Users;
