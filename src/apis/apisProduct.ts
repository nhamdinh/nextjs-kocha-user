"use server";
import { API_LINK } from "@/utils/constants";
import { deleteData, getData, getDataById, postData, updateData } from "./apis";
const BE_API = API_LINK + "store/products";

export const createUser = async (data: any) => {
  const response = await postData(`${BE_API}`, data, {
    tag: "getAllProducts",
  });
  return await response.json();
};

export const deleteUser = async (data: any) => {
  const response = await deleteData(
    `${BE_API}/${data?.id}`,
    {},
    {
      tag: "getAllProducts",
    }
  );
  return await response.json();
};

export const getUserById = async (data: any) => {
  const response = await getDataById(`${BE_API}/${data?.id}`, {
    tags: ["getUserById"],
  });
  return await response.json();
};

export const updateUserById = async (data: any) => {
  const response = await updateData(`${BE_API}/${data?.id}`, data, {
    tag: "getAllProducts",
  });
  return await response.json();
};

export const getAllProducts = async ({ currentPage, PAGE_SIZE }: any) => {
  return await getData(`${BE_API}`, {
    tags: ["getAllProducts"],
  });
};
