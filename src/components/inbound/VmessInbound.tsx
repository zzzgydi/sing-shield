import { Form, Input, Select, Switch, Space, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { ListenFields } from "./ListenFields";

export const VmessInbound = () => {
  const labelCol = { span: 6 };
  return (
    <>
      <Form.Item name="tag" label="tag" labelCol={labelCol}>
        <Input />
      </Form.Item>
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <Form.Item label="users" labelCol={labelCol}>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} className="flex mb-2" align="baseline">
                <Form.Item {...restField} name={[name, "name"]} label="name">
                  <Input />
                </Form.Item>
                <Form.Item {...restField} name={[name, "uuid"]} label="uuid">
                  <Input />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "alterId"]}
                  label="alterId"
                >
                  <Input />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add users
              </Button>
            </Form.Item>
          </Form.Item>
        )}
      </Form.List>

      <Form.Item name="tls" label="tls" labelCol={labelCol}>
        undefined
      </Form.Item>
      <Form.Item name="transport" label="transport" labelCol={labelCol}>
        undefined
      </Form.Item>
      <ListenFields />
    </>
  );
};
