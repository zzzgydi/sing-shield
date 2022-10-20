import fs from "fs";
import path from "path";

const INPUT_DIR = "./codegen/inputs";

fs.readdirSync(INPUT_DIR).forEach((file) => {
  const filePath = path.join(INPUT_DIR, file);

  const data = fs.readFileSync(filePath, { encoding: "utf-8" });

  parse(data);
});

function parse(input) {
  const structRegex = /(#\[\w+\]\s+)?(\w+)\s+\{([^}]+)\}/gm;

  const captureRegex = /(#\[\w+\]\s+)?(\w+)\s+\{([^}]+)\}/;

  const contentRegex = /(\w+)\s*(\?)?\s*:\s*(\w+);?/;

  const CompMap = {
    string: "<Input />",
    number: "<Input />",
    boolean: "<Switch />",
  };

  for (const each of input.match(structRegex)) {
    const match = each.match(captureRegex);

    if (!match) {
      console.error(each);
      continue;
    }

    const inline = !!match[1];
    const label = match[2];
    const content = match[3].trim();

    const data = content
      .split("\n")
      .map((str) => str.trim().match(contentRegex))
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
      .join("\n");

    const ret = `
    import { Form, Input, Select } from "antd";

    export const ${label} = () => {
      const labelCol = { span: 6 };
      return (
        <>
          ${data}
        </>
      )
    }
    `;

    const outputFile = path.join("./codegen/outputs", `${label}.tsx`);

    fs.writeFileSync(outputFile, ret);
  }
}
