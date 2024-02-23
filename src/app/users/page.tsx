import { PAGE_SIZE } from "@/utils/constants";
import Users from "./components/Users";
import { getAllUsers } from "@/apis/apisUser";

const UsersPage = async (props: any) => {
  const currentPage = +(props?.searchParams?.page ?? 1);
  const res = await getAllUsers({ currentPage, PAGE_SIZE });
  const totalCount = +(res.headers?.get("X-Total-Count") ?? 1);
  const data = await res.json();
  return (
    <Users
      users={data ?? []}
      metadata={{
        totalCount,
        currentPage,
        PAGE_SIZE,
      }}
    ></Users>
  );
};

export default UsersPage;
