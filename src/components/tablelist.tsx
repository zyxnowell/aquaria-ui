import React, { Fragment, useEffect, useState } from "react";
import { Table, Tag, Space, Button, Popconfirm, notification } from "antd";
import "../App.css";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import * as actions from "../actions/aquaria";
import { Aquaria } from "../models";
import FormModal from "./modal";

const TableList = (props: any) => {
  const {
    aquariaList,
    pending,
    updateData,
    deleteData,
    fetchAllData,
    reload,
    pagination,
    tableConfig,
  } = props;
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<any>();

  let defaultparams = {
    page: 0,
    size: 5,
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Scientific Name",
      dataIndex: "scientificName",
      key: "scientificName",
      sorter: true,
    },
    {
      title: "Minimum Tank Size",
      dataIndex: "minimumTankSize",
      key: "minimumTankSize",
      sorter: true,
      render: (text: any) => (
        <span>{text === undefined ? 0 : text} Gallons</span>
      ),
    },
    {
      title: "Temperament",
      dataIndex: "temperament",
      key: "temperament",
      sorter: true,
      render: (text: any) => {
        let color = "green";
        if (text === "Aggressive") color = "red";
        else if (text === "Semi-Aggressive") color = "orange";

        return (
          <Tag color={color} key={text}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      sorter: true,
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setData(record);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title={() => {
              return `Are you sure to delete ${record.name}?`;
            }}
            onConfirm={() => {
              deleteConfirm(record);
            }}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            okText="Yes"
            cancelText="No"
          >
            <Button
              key="delete"
              type="primary"
              danger
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const deleteConfirm = (record: any) => {
    deleteData(record._id, successNotification("deleted", record.name));
  };

  const successNotification = (action: string, name: string) => {
    notification.success({
      message: "Success",
      description: `${name} was ${action} successfully`,
      style: {
        width: 600,
      },
      duration: 3,
    });
    setData(undefined);
    setVisible(false);
  };

  const onUpdate = (values: any) => {
    const record: Aquaria = {
      id: values._id,
      name: values.name,
      scientificName: values.scientificName,
      minimumTankSize: values.minimumTankSize,
      temperament: values.temperament,
      details: values.details,
    };
    updateData(record.id, record, successNotification("updated", values.name));
  };

  const formatSorter = (sorter: any) => {
    if (sorter.order) {
      return `${sorter.columnKey} ${
        sorter.order === "descend" ? "desc" : "asc"
      }`;
    }
    return "";
  };

  const onChange = (
    pagination: any,
    filters: any,
    sorter: any,
    currentData: any
  ) => {
    fetchAllData({
      ...tableConfig,
      page: pagination.current - 1,
      size: pagination.pageSize,
      sort: formatSorter(sorter),
    });
  };

  useEffect(() => {
    fetchAllData({ ...defaultparams, ...tableConfig });
  }, []);

  useEffect(() => {
    if (data) setVisible(true);
    if (reload)
      fetchAllData({
        page: pagination.page - 1,
        size: pagination.limit,
        ...tableConfig,
      });
  }, [data, reload]);

  return (
    <Fragment>
      <FormModal
        visible={visible}
        onSubmit={onUpdate}
        onCancel={() => {
          setData(undefined);
          setVisible(false);
        }}
        mode="edit"
        updateData={data}
      />
      <Table
        columns={columns}
        dataSource={aquariaList}
        loading={pending}
        onChange={onChange}
        pagination={{
          total: pagination.totalDocs,
          current: pagination.page,
          defaultPageSize: 5,
          showSizeChanger: false,
        }}
      />
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  aquariaList: state.aquaria.list,
  pending: state.aquaria.pending,
  reload: state.aquaria.reload,
  pagination: state.aquaria.pagination,
  tableConfig: state.aquaria.tableConfig,
});

const mapActionToProps = {
  fetchAllData: actions.fetchAll,
  updateData: actions.update,
  deleteData: actions.Delete,
};

export default connect(mapStateToProps, mapActionToProps)(TableList);
