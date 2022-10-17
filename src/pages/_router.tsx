import { ConfigPage } from "./config";
import { HomePage } from "./home";
import { ProxyPage } from "./proxy";

export const routes = [
  {
    path: "/",
    name: "首页",
    element: <HomePage />,
  },
  {
    path: "/config",
    name: "配置",
    element: <ConfigPage />,
  },
  {
    path: "/proxy",
    name: "代理",
    element: <ProxyPage />,
  },
];
