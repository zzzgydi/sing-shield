import { Form, Input, Select, Switch, Space, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { ListenFields } from "./ListenFields";

export const HttpInbound = () => {
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
                <Form.Item
                  {...restField}
                  name={[name, "username"]}
                  label="username"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "password"]}
                  label="password"
                >
                  <Input />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              Add users
            </Button>
          </Form.Item>
        )}
      </Form.List>

      <Form.Item name="tls" label="tls" labelCol={labelCol}>
        undefined
      </Form.Item>
      <Form.Item
        name="set_system_proxy"
        label="set_system_proxy"
        labelCol={labelCol}
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <ListenFields />
    </>
  );
};
