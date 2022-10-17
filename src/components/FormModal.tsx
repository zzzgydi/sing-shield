import { Form, Modal } from "antd";
import { useRef, useState } from "react";
import { DirectInbound } from "./inbound/Direct";

interface Props {
  handler?: ReturnType<typeof useInboundForm>;
  onSubmit: (value: IInbound) => void;
}

export const FormModal = (props: Props) => {
  const { handler, onSubmit } = props;

  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");

  const [form] = Form.useForm();

  if (handler) {
    handler.current = {
      createInbound: (type: string) => {
        setOpen(true);
        setType(type);
      },
    };
  }

  return (
    <Modal
      title={type}
      width={600}
      open={open}
      onCancel={() => setOpen(false)}
      onOk={async () => {
        onSubmit(await form.validateFields());
        setOpen(false);
        form.resetFields();
      }}
      bodyStyle={{ height: 360, overflowY: "auto", paddingBottom: 10 }}
    >
      <Form form={form}>{type === "direct" && <DirectInbound />}</Form>
    </Modal>
  );
};

export const useInboundForm = () => {
  return useRef({ createInbound: (_type: string) => {} });
};
