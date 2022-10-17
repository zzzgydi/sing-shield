import { Form, Input, Switch } from "antd";

export const ListenField = () => {
  const labelCol = { span: 6 };

  return (
    <>
      <Form.Item name="listen" label="listen" labelCol={labelCol}>
        <Input />
      </Form.Item>

      <Form.Item name="listen_port" label="listen_port" labelCol={labelCol}>
        <Input />
      </Form.Item>

      <Form.Item
        name="tcp_fast_open"
        label="tcp_fast_open"
        labelCol={labelCol}
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        name="udp_fragment"
        label="udp_fragment"
        labelCol={labelCol}
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        name="sniff"
        label="sniff"
        labelCol={labelCol}
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        name="sniff_override_destination"
        label="sniff_override_destination"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        name="domain_strategy"
        label="domain_strategy"
        labelCol={labelCol}
      >
        <Input />
      </Form.Item>

      <Form.Item name="udp_timeout" label="udp_timeout" labelCol={labelCol}>
        <Input />
      </Form.Item>

      <Form.Item
        name="proxy_protocol"
        label="proxy_protocol"
        labelCol={labelCol}
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        name="proxy_protocol_accept_no_header"
        label="proxy_protocol_accept_no_header"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item name="detour" label="detour" labelCol={labelCol}>
        <Input />
      </Form.Item>
    </>
  );
};
