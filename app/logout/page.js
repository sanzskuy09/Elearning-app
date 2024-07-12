import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { ConfigProvider, Modal, Space, Table } from "antd";
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";

const Logout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    confirm({
      title: "Kamu yakin ingin logout?",
      icon: <ExclamationCircleFilled />,
      centered: true,
      // content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        try {
          setLoading(true);
          localStorage.setItem("id_relawan", "");
          localStorage.setItem("role", "");
          localStorage.setItem("token", "");
          localStorage.setItem("nama_panggilan", "");
          localStorage.setItem("email", "");
          setTimeout(() => {
            setLoading(false);
            router.push("/");
          }, 1000);
        } catch (error) {
          router.push(-1);
          setLoading(false);
        }
      },
      onCancel() {
        router.push(-1);
        console.log("Cancel");
      },
    });
  };

  useEffect(() => {
    handleDelete();
  }, []);
  return <div></div>;
};

export default Logout;
