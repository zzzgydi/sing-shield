import axios, { AxiosInstance } from "axios";

const SWORD_TOKEN_KEY = "sing-sword-token";

interface ISwordToken {
  server: string;
  port: string | number;
  token: string;
}

let swordTokenCache: Partial<ISwordToken> | null = null;

export async function getSwordToken(refresh = false) {
  if (swordTokenCache && !refresh) {
    return swordTokenCache;
  }

  const params = new URLSearchParams(window.location.search);

  let sword: Partial<ISwordToken> = {};

  try {
    sword = JSON.parse(localStorage.getItem(SWORD_TOKEN_KEY) || "");
  } catch {}

  const server = params.get("server") ?? sword.server;
  const port = params.get("port") ?? sword.port;
  const token = params.get("token") ?? sword.token;

  sword = swordTokenCache = { server, port, token };

  try {
    localStorage.setItem(SWORD_TOKEN_KEY, JSON.stringify(sword));
  } catch {}

  return sword;
}

let axiosIns: AxiosInstance = null!;

export async function swordServer(refresh = false) {
  if (axiosIns && !refresh) return axiosIns;

  const info = await getSwordToken(refresh);

  const server = info.server || "localhost";
  const port = info.port || 33211;

  axiosIns = axios.create({
    baseURL: `http://${server}:${port}`,
    headers: info.token ? { Authorization: `Bearer ${info.token}` } : {},
  });
  axiosIns.interceptors.response.use((r) => r.data);

  return axiosIns;
}

export async function getSwordVersion() {
  const axiosIns = await swordServer();
  return axiosIns.get("/api/version") as Promise<{ version: string }>;
}

export async function getSwordConfig() {
  const axiosIns = await swordServer();
  return axiosIns.get("/api/config") as Promise<ISwordConfig>;
}

export async function getSingBoxConfig() {
  const axiosIns = await swordServer();
  return axiosIns.get("/api/sing_box") as Promise<ISingBox>;
}

export async function putSwordConfig(config: ISwordConfig) {
  const axiosIns = await swordServer();
  return axiosIns.put("/api/config", config);
}

export async function putSingBoxConfig(config: ISingBox) {
  const axiosIns = await swordServer();
  return axiosIns.put("/api/sing_box", config);
}
