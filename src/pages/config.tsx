import useSWR from "swr";
import { getSingBoxConfig } from "@/services/sword";
import { FormModal, useInboundForm } from "@/components/FormModal";
import { Button, Dropdown, Menu } from "antd";

export const ConfigPage = () => {
  const { data: singBox } = useSWR("getSingBoxConfig", getSingBoxConfig);

  console.log(singBox);

  const inboundHandler = useInboundForm();

  const inboundList = [
    "direct",
    "mixed",
    "socks",
    "http",
    "shadowsocks",
    "vmess",
    "trojan",
    "naive",
    "hysteria",
    "shadowtls",
    "tun",
    "redirect",
    "tproxy",
  ];

  const outboundList = [
    "direct",
    "block",
    "socks",
    "http",
    "shadowsocks",
    "vmess",
    "trojan",
    "wireguard",
    "hysteria",
    "shadowtls",
    "shadowsocksr",
    "vless",
    "tor",
    "ssh",
    "dns",
    "selector",
    "urltest",
  ];

  return (
    <div className="px-5 py-3">
      <div className="text-lg rounded-md bg-slate-50 py-2 px-4 mb-4">
        SingBox 配置
      </div>

      <div className="text-lg rounded-md bg-slate-50 py-2 px-4 mb-4 flex items-center justify-between">
        Inbounds
        <Dropdown
          placement="bottomRight"
          trigger={["click"]}
          overlay={
            <Menu
              onClick={({ key }) => {
                inboundHandler.current.createInbound(key);
              }}
              items={inboundList.map((e) => ({ label: e, key: e }))}
            />
          }
        >
          <Button type="primary">新增入站</Button>
        </Dropdown>
      </div>

      <div className="text-lg rounded-md bg-slate-50 py-2 px-4 mb-4 flex items-center justify-between">
        Outbounds
        <Dropdown
          placement="bottomRight"
          trigger={["click"]}
          overlay={
            <Menu
              onClick={({ key }) => {
                console.log(key);
              }}
              items={outboundList.map((e) => ({ label: e, key: e }))}
            />
          }
        >
          <Button type="primary">新增出站</Button>
        </Dropdown>
      </div>

      <FormModal
        handler={inboundHandler}
        onSubmit={(value) => {
          console.log(value);
        }}
      />
    </div>
  );
};
