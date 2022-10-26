import { Form, Input, Select, Switch, Space, Button } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { ListenFields } from "./ListenFields";

export const ShadowsocksInbound = () => {
  const labelCol = { span: 6 };
  return (
    <>
      <Form.Item name="tag" label="tag" labelCol={labelCol}>
        <Input />
      </Form.Item>

      <Form.Item name="method" label="method" labelCol={labelCol}>
        <Input />
      </Form.Item>

      <Form.Item name="password" label="password" labelCol={labelCol}>
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

      <Form.List name="destinations">
        {(fields, { add, remove }) => (
          <Form.Item label="destinations" labelCol={labelCol}>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} className="flex mb-2" align="baseline">
                <Form.Item {...restField} name={[name, "name"]} label="name">
                  <Input />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "server"]}
                  label="server"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "server_port"]}
                  label="server_port"
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
              Add destinations
            </Button>
          </Form.Item>
        )}
      </Form.List>

      <ListenFields />
    </>
  );
};
