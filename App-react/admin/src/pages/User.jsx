import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space, Button, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users data
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4000/api/user");
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        message.error("Không thể tải dữ liệu người dùng");
      }
    } catch (error) {
      message.error("Không thể tải dữ liệu người dùng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle delete user
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/api/user/${userId}`);
      message.success("Xóa người dùng thành công");
      fetchUsers(); // Refresh the list
    } catch (error) {
      message.error("Không thể xóa người dùng");
    }
  };

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => phone || '-'
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => avatar ? <img src={avatar} alt="avatar" style={{ width: 50, height: 50, borderRadius: '50%' }} /> : '-'
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
       
          {/* <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          >
            Xóa
          </Button> */}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
      </div>
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="_id"
        pagination={{
          pageSize: 10,
          showTotal: (total) => `Tổng số ${total} người dùng`,
        }}
      />
    </div>
  );
};

export default User;