"use server";
import { deleteData, getData, getDataById, postData, updateData } from "./apis";
const BE = "http://localhost:8000/";
const BE_users = BE + "users";

export const createUser = async (data: any) => {
  const response = await postData(`${BE_users}`, data, {
    tag: "getAllUsers",
  });
  return await response.json();
};

export const deleteUser = async (data: any) => {
  const response = await deleteData(
    `${BE_users}/${data?.id}`,
    {},
    {
      tag: "getAllUsers",
    }
  );
  return await response.json();
};

export const getUserById = async (data: any) => {
  const response = await getDataById(`${BE_users}/${data?.id}`, {
    tags: ["getUserById"],
  });
  return await response.json();
};

export const updateUserById = async (data: any) => {
  const response = await updateData(`${BE_users}/${data?.id}`, data, {
    tag: "getAllUsers",
  });
  return await response.json();
};

export const getAllUsers = async ({ currentPage, PAGE_SIZE }: any) => {
  return await getData(`${BE_users}?_page=${currentPage}&_limit=${PAGE_SIZE}`, {
    tags: ["getAllUsers"],
  });
};
