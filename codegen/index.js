const inputStr = `
  listen: string;
  listen_port: number;
  tcp_fast_open: boolean;
  udp_fragment: boolean;
  sniff: boolean;
  sniff_override_destination: boolean;
  domain_strategy: string;
  udp_timeout: number;
  proxy_protocol: boolean;
  proxy_protocol_accept_no_header: boolean;
  detour: string;
`;

const regex = /(\w+)\s*(\?)?\s*:\s*(\w+);?/;

const CompMap = {
  string: "<Input />",
  number: "<Input />",
  boolean: "<Switch />",
};

console.log(
  inputStr
    .split("\n")
    .map((str) => str.trim().match(regex))
    .filter(Boolean)
    .map((e) => [e[1], e[3], !!e[2]])
    .map(([key, type, optional]) => {
      const isFlex = key.length > 18;
      const labelCol = !isFlex ? "labelCol={labelCol}" : "";
      const extra = type === "boolean" ? 'valuePropName="checked"' : "";
      // const require = !optional ? "rules={[{ required: true }]}"

      return `
      <Form.Item name="${key}" label="${key}" ${labelCol} ${extra}>
        ${CompMap[type]}
      </Form.Item>`;
    })
    .join("\n")
);
