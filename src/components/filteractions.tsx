import React, { useState, Fragment } from "react";
import { Form, Input, Button, notification } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import * as actions from "../actions/aquaria";
import { Aquaria } from "../models";
import FormModal from "./modal";

const { Search } = Input;

const FilterActions = (props: any) => {
  const { createData, fetchAllData, pagination, tableConfig } = props;
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const successNotification = () => {
    notification.success({
      message: "Success",
      description: "New record was added successfully.",
      style: {
        width: 600,
      },
      duration: 3,
    });
  };

  const onCreate = (values: any) => {
    const newRecord: Aquaria = {
      name: values.name,
      scientificName: values.scientificName,
      minimumTankSize: values.minimumTankSize,
      temperament: values.temperament,
      details: values.details,
    };

    createData(newRecord, successNotification());
    setVisible(false);
  };

  const onSearch = (value: any) => {
    console.log(value);
    fetchAllData({
      page: 0,
      size: pagination.limit,
      search: value,
    });
  };

  return (
    <Fragment>
      <FormModal
        visible={visible}
        onSubmit={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        mode="add"
      />
      <Form
        name="horizontal_login"
        layout="inline"
        onKeyDown={(e) => (e.key === "Enter" ? e.preventDefault() : "")}
      >
        <Form.Item>
          <Search
            placeholder="Search"
            onChange={(e) => {
              onSearch(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusSquareOutlined />}
              onClick={showModal}
            >
              Add
            </Button>
          )}
        </Form.Item>
      </Form>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  reload: state.aquaria.reload,
  pagination: state.aquaria.pagination,
  tableConfig: state.aquaria.tableConfig,
});

const mapActionToProps = {
  fetchAllData: actions.fetchAll,
  createData: actions.create,
};

export default connect(mapStateToProps, mapActionToProps)(FilterActions);
