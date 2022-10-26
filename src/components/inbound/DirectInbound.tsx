import { Form, Input, Select } from "antd";
import { ListenFields } from "./ListenFields";

export const DirectInbound = () => {
  const labelCol = { span: 6 };

  return (
    <>
      <Form.Item name="tag" label="tag" labelCol={labelCol}>
        <Input />
      </Form.Item>

      <Form.Item name="network" label="network" labelCol={labelCol}>
        <Select
          allowClear
          options={[
            { label: "tcp", value: "tcp" },
            { label: "udp", value: "udp" },
          ]}
        />
      </Form.Item>

      <Form.Item
        name="override_address"
        label="override_address"
        labelCol={labelCol}
      >
        <Input />
      </Form.Item>

      <Form.Item name="override_port" label="override_port" labelCol={labelCol}>
        <Input />
      </Form.Item>

      <ListenFields />
    </>
  );
};
