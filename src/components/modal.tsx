import React from "react";
import { Form, Input, Modal, InputNumber, Select } from "antd";
import { CollectionCreateFormProps } from "../models";

const { TextArea } = Input;
const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const FormModal: React.FC<CollectionCreateFormProps> = ({
  visible,
  onSubmit,
  onCancel,
  mode,
  updateData,
}) => {
  const [form] = Form.useForm();

  if (updateData !== undefined) {
    form.setFieldsValue({
      name: updateData.name,
      scientificName: updateData.scientificName,
      minimumTankSize: updateData.minimumTankSize,
      temperament: updateData.temperament,
      details: updateData.details,
    });
  }

  return (
    <Modal
      destroyOnClose={true}
      closable={false}
      maskClosable={false}
      visible={visible}
      title={mode === "add" ? "Create a new record" : "Update a record"}
      okText={mode === "add" ? "Create" : "Update"}
      cancelText="Cancel"
      onCancel={() => {
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            if (mode === "add") {
              onSubmit(values);
            } else {
              const newVal = {
                ...values,
                _id: updateData._id,
              };
              onSubmit(newVal);
            }
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} id="addRecordForm" {...layout} name="control-hooks">
        <Form.Item
          name="name"
          label="Name"
          hasFeedback
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="scientificName"
          label="Scientific Name"
          hasFeedback
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="minimumTankSize"
          label="Min. Tank Size"
          hasFeedback
          rules={[{ required: true }]}
        >
          <InputNumber min={1} max={10000} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="temperament"
          label="Temperament"
          hasFeedback
          rules={[{ required: true }]}
        >
          <Select placeholder="Please select temperament">
            <Option value="Peaceful">Peaceful</Option>
            <Option value="Semi-Aggressive">Semi-Aggressive</Option>
            <Option value="Aggressive">Aggressive</Option>
          </Select>
        </Form.Item>
        <Form.Item name="details" label="Details">
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormModal;
