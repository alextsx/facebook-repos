"use client";
import { Table } from "@/components/index";
import { selectUsers } from "@/redux/user/userSlice";
import { useSelector } from "react-redux";

const UserList = () => {
  const users = useSelector(selectUsers);
  return <Table headers={["Avatar", "Login", "Type"]} content={users} />;
};

export default UserList;
