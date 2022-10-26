import fs from "fs";
import path from "path";

const INPUT_DIR = "./codegen/inputs";

const CompMap = {
  any: "<Input />",
  string: "<Input />",
  number: "<Input />",
  boolean: "<Switch />",
};

const map = {};

fs.readdirSync(INPUT_DIR).forEach((file) => {
  const filePath = path.join(INPUT_DIR, file);

  const data = fs.readFileSync(filePath, { encoding: "utf-8" });

  parse(data);
});

function parse(input) {
  const structRegex = /(#\[\w+\]\s+)?(\w+)\s+\{([^}]+)\}/gm;

  const captureRegex = /(#\[\w+\]\s+)?(\w+)\s+\{([^}]+)\}/;

  for (const each of input.match(structRegex)) {
    const match = each.match(captureRegex);

    if (!match) {
      console.error(each);
      continue;
    }

    const inline = !!match[1];
    const label = match[2];
    const content = match[3].trim();

    map[label] = { inline, label, content };
  }

  for (const [label, { inline }] of Object.entries(map)) {
    if (inline) continue;

    let { antdImports, imports, elements } = parseContent(label);

    antdImports = [...new Set(antdImports)];
    imports = [...new Set(imports)];

    const fileData = `
    import {${antdImports.join(", ")}} from "antd";
    ${imports.join("\n")}

    export const ${label} = () => {
      const labelCol = { span: 6 };
      return (
        <>
          ${elements.join("\n\n")}
        </>
      )
    }`;

    const outputFile = path.join("./codegen/outputs", `${label}.tsx`);
    fs.writeFileSync(outputFile, fileData);
  }
}

function parseContent(label, isArray = false) {
  const contentRegex = /(\w+)\s*(!)?\s*:\s*([a-zA-Z0-9\[\]]+);?/;
  const extendsRegex = /@extends\s+(\w+);?/;

  const antdImports = ["Form", "Input", "Select", "Switch"];
  const imports = [];
  const elements = [];

  console.log(label);
  const lines = map[label].content
    .split("\n")
    .map((e) => e.trim())
    .filter(Boolean);

  for (const line of lines) {
    let result = line.match(contentRegex);
    if (result) {
      let [_a, key, required, type] = result;
      console.log({ key, type });

      const isFlex = key.length > 18;
      const labelCol = !isFlex ? "labelCol={labelCol}" : "";
      const extra = type === "boolean" ? 'valuePropName="checked"' : "";
      const require = required ? "rules={[{ required: true }]}" : "";

      if (type.includes("[]")) {
        type = type.replace("[]", "").trim();
        antdImports.push("Space", "Button");
        imports.push(
          `import { MinusCircleOutlined } from "@ant-design/icons";`
        );

        const temp = parseContent(type, true);
        antdImports.push(...temp.antdImports);
        imports.push(...temp.imports);
        elements.push(
          `<Form.List name="${key}" ${require}>
          {(fields, { add, remove }) => (
            <Form.Item label="${key}" labelCol={labelCol}>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} className="flex mb-2" align="baseline">
                  ${temp.elements.join("\n\n")}
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}

              <Button type="dashed" onClick={() => add()} block>Add ${key}</Button>
            </Form.Item>
          )}
          </Form.List>
          `
        );
        continue;
      }

      // 是定义的组件类型
      if (map[type]) {
        const temp = parseContent(type, isArray);
        antdImports.push(...temp.antdImports);
        imports.push(...temp.imports);

        if (isArray) {
          elements.push(
            `<Form.List name="${key}" ${labelCol} ${require}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} className="flex mb-2" align="baseline">
                    ${temp.elements.join("\n\n")}
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}

                <Button type="dashed" onClick={() => add()} block>
                  Add ${key}
                </Button>
              </>
            )}
            </Form.List>
            `
          );
        } else {
          elements.push(...temp.elements);
        }
      } else if (isArray) {
        elements.push(
          `<Form.Item {...restField} name={[name, "${key}"]} label="${key}" ${extra} ${require}>
            ${CompMap[type]}
          </Form.Item>`
        );
      } else {
        elements.push(
          `<Form.Item name="${key}" label="${key}" ${labelCol} ${extra} ${require}>
            ${CompMap[type]}
          </Form.Item>`
        );
      }

      continue;
    }

    result = line.match(extendsRegex);
    if (result) {
      const name = result[1];
      if (map[name]) {
        imports.push(`import { ${name} } from "./${name}";`);
        elements.push(`<${name} />`);
      } else {
        console.error("找不到", name);
      }
    }
  }

  return {
    antdImports,
    imports,
    elements,
  };
}
