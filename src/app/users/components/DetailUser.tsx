"use client";

const DetailUser = ({ props }: any) => {
  console.log(props.params);
  return <div>DetailUser {props?.params?.id}</div>;
};

export default DetailUser;
