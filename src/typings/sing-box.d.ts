interface ISingBox {
  log?: Partial<ILog>;
  dns?: Partial<IDns>;
  route?: Partial<IRoute>;
  experimental?: Partial<IExperimental>;
  inbounds?: IInbound[];
  outbounds: IOutbound[];
}

interface ILog {
  disabled: boolean;
  level: string;
  output: string;
  timestamp: boolean;
}

/**
 *
 * dns
 *
 */

interface IDns {
  servers: IDnsServer[];
  rules: IDnsRule[];
  final: string;
  strategy: string;
  disable_cache: boolean;
  disable_expire: boolean;
}

interface IDnsServer {
  tag?: string;
  address: string;
  address_resolver?: string;
  address_strategy?: string;
  strategy?: string;
  detour?: string;
}

type IDnsRule = IDnsRuleDefault | IDnsRuleLogical;

interface IDnsRuleDefault {
  type?: "default";
  inbound?: string[];
  ip_version?: number;
  network?: string;
  auth_user?: string[];
  protocol?: string[];
  domain?: string[];
  domain_suffix?: string[];
  domain_keyword?: string[];
  domain_regex?: string[];
  geosite?: string[];
  source_geoip?: string[];
  source_ip_cidr?: string[];
  source_port?: number[];
  source_port_range?: string[];
  port?: number[];
  port_range?: string[];
  process_name?: string[];
  process_path?: string[];
  package_name?: string[];
  user?: string[];
  user_id?: number[];
  clash_mode?: string;
  invert?: boolean;
  outbound?: string[];
  server: string;
  disable_cache?: boolean;
}

interface IDnsRuleLogical {
  type: "logical";
  mode?: string;
  rules?: IDnsRule[];
  server: string;
  disable_cache?: boolean;
}

/**
 *
 * route
 *
 */

interface IRoute {
  geoip: IGeoipSite;
  geosite: IGeoipSite;
  rules: IRouteRule[];
  log_rule: IRouteRuleLogical[];
  final: string;
  auto_detect_interface: boolean;
  override_android_vpn: boolean;
  default_interface: string;
  default_mark: number;
}

interface IGeoipSite {
  path?: string;
  download_url?: string;
  download_detour?: string;
}

type IRouteRule = IRouteRuleDefault | IRouteRuleLogical;

interface IRouteRuleDefault {
  type?: "default";
  inbound?: string[];
  ip_version?: number;
  network?: string;
  auth_user?: string[];
  protocol?: string[];
  domain?: string[];
  domain_suffix?: string[];
  domain_keyword?: string[];
  domain_regex?: string[];
  geosite?: string[];
  source_geoip?: string[];
  geoip?: string[];
  source_ip_cidr?: string[];
  ip_cidr?: string[];
  source_port?: number[];
  source_port_range?: string[];
  port?: number[];
  port_range?: string[];
  process_name?: string[];
  process_path?: string[];
  package_name?: string[];
  user?: string[];
  user_id?: number[];
  clash_mode?: string;
  invert?: boolean;
  outbound: string;
}

interface IRouteRuleLogical {
  type: "logical";
  mode?: string;
  rules?: IRouteRule[];
  invert?: boolean;
  outbound: string;
}

/**
 *
 * experimental
 *
 */

interface IExperimental {
  clash_api?: Partial<IClashApi>;
  v2ray_api?: Partial<IV2rayApi>;
}

interface IClashApi {
  external_controller: string;
  external_ui: string;
  secret: string;
  direct_io: boolean;
  default_mode: string;
  store_selected: boolean;
  cache_file: string;
}

interface IV2rayApi {
  listen: string;
  stats: Partial<{
    enabled: boolean;
    direct_io: boolean;
    inbounds: string[];
    outbounds: string[];
  }>;
}

/**
 *
 * share fields
 *
 */
interface IListenFields {
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
}

interface IDialFields {
  detour: string;
  bind_interface: string;
  bind_address: string;
  routing_mark: number;
  reuse_addr: boolean;
  connect_timeout: string;
  tcp_fast_open: boolean;
  udp_fragment: boolean;
  domain_strategy: string;
  fallback_delay: string;
}

interface ITlsInbound {
  enabled: boolean;
  server_name: string;
  alpn: any[];
  min_version: string;
  max_version: string;
  cipher_suites: any[];
  certificate: string;
  certificate_path: string;
  key: string;
  key_path: string;
  acme: Partial<{
    domain: any[];
    data_directory: string;
    default_server_name: string;
    email: string;
    provider: string;
    disable_http_challenge: boolean;
    disable_tls_alpn_challenge: boolean;
    alternative_http_port: number;
    alternative_tls_port: number;
    external_account: {
      key_id?: string;
      mac_key?: string;
    };
  }>;
}

interface ITlsOutbound {
  enabled: boolean;
  disable_sni: boolean;
  server_name: string;
  insecure: boolean;
  alpn: any[];
  min_version: string;
  max_version: string;
  cipher_suites: any[];
  certificate: string;
  certificate_path: string;
  ech: Partial<{
    enabled: boolean;
    pq_signature_schemes_enabled: boolean;
    dynamic_record_sizing_disabled: boolean;
    config: string;
  }>;
  utls: Partial<{
    enabled: boolean;
    fingerprint: string;
  }>;
}

interface IMultiplex {
  enabled: boolean;
  protocol: string;
  max_connections: number;
  min_streams: number;
  max_streams: number;
}

// todo
interface IV2rayTransport {}

/**
 *
 * inbound
 *
 */

type IInbound = (
  | IInDirect
  | IInMixed
  | IInSocks
  | IInHttp
  | IInShadowsocks
  | IInVmess
  | IInTrojan
  | IInHysteria
  | IInShadowtls
  | IInTun
  | IInRedirect
  | IInTproxy
) &
  Partial<IListenFields>;

interface IInDirect {
  type: "direct";
  tag: string;
  network?: "udp" | "tcp";
  override_address?: string;
  override_port?: number;
}

interface IInMixed {
  type: "mixed";
  tag: string;
  users?: {
    username: string;
    password: string;
  }[];
  set_system_proxy?: boolean;
}

interface IInSocks {
  type: "socks";
  tag: string;
  users?: {
    username: string;
    password: string;
  }[];
}

interface IInHttp {
  type: "http";
  tag: string;
  users?: {
    username: string;
    password: string;
  }[];
  tls?: Partial<ITlsInbound>;
  set_system_proxy?: boolean;
}

interface IInShadowsocks {
  type: "shadowsocks";
  tag: string;
  method?: string;
  password?: string;
  users?: {
    name: string;
    password: string;
  }[];
  destinations?: {
    name?: string;
    server?: string;
    server_port?: number;
    password?: string;
  }[];
}

interface IInVmess {
  type: "vmess";
  tag: string;
  users?: {
    name?: string;
    uuid?: string;
    alterId?: number;
  }[];
  tls?: Partial<ITlsInbound>;
  transport?: Partial<IV2rayTransport>;
}

interface IInTrojan {
  type: "trojan";
  tag: string;
  users?: {
    name?: string;
    password?: string;
  }[];
  tls?: Partial<ITlsInbound>;
  fallback?: {
    server?: string;
    server_port?: number;
  };
  fallback_for_alpn?: {
    "http/1.1"?: {
      server?: string;
      server_port?: number;
    };
  };
  transport?: Partial<IV2rayTransport>;
}

interface IInNaive {
  type: "naive";
  tag: string;
  network?: "udp" | "tcp";
  users?: {
    username: string;
    password: string;
  }[];
  tls?: Partial<ITlsInbound>;
}

interface IInHysteria {
  type: "hysteria";
  tag: string;
  up?: string;
  up_mbps?: number;
  down?: string;
  down_mbps?: number;
  obfs?: string;
  auth?: string;
  auth_str?: string;
  recv_window_conn?: number;
  recv_window_client?: number;
  max_conn_client?: number;
  disable_mtu_discovery?: boolean;
  tls?: Partial<ITlsInbound>;
}

interface IInShadowtls {
  type: "shadowtls";
  tag: string;
  version?: number;
  password?: string;
  handshake?: {
    server?: string;
    server_port?: number;
  } & Partial<IDialFields>;
}

interface IInTun {
  type: "tun";
  tag: string;
  interface_name?: string;
  inet4_address?: string;
  inet6_address?: string;
  mtu?: number;
  auto_route?: boolean;
  strict_route?: boolean;
  endpoint_independent_nat?: boolean;
  stack?: string;
  include_uid?: number[];
  include_uid_range?: string[];
  exclude_uid?: number[];
  exclude_uid_range?: string[];
  include_android_user?: number[];
  include_package?: string[];
  exclude_package?: string[];
}

interface IInRedirect {
  type: "redirect";
  tag: string;
}

interface IInTproxy {
  type: "tproxy";
  tag: string;
  network?: "udp" | "tcp";
}

/**
 *
 * outbound
 *
 */

type IOutbound =
  | ((
      | IOutDirect
      | IOutSocks
      | IOutHttp
      | IOutShadowsocks
      | IOutVmess
      | IOutTrojan
      | IOutWireGuard
      | IOutHysteria
      | IOutShadowtls
      | IOutShadowsocksr
      | IOutVless
      | IOutTor
      | IOutSsh
    ) &
      IDialFields)
  | IOutBlock
  | IOutDns
  | IOutSelector
  | IOutUrltest;

interface IOutDirect {
  type: "direct";
  tag: string;
  override_address?: string;
  override_port?: number;
  proxy_protocol?: number;
  // ...dial
}

interface IOutBlock {
  type: "block";
  tag: string;
}

interface IOutDns {
  type: "dns";
  tag: string;
}

interface IOutSocks {
  type: "socks";
  tag: string;
  server: string;
  server_port?: number;
  version?: string;
  username?: string;
  password?: string;
  network?: "tcp" | "udp";
  udp_over_tcp?: boolean;
}

interface IOutHttp {
  type: "http";
  tag: string;
  server: string;
  server_port: number;
  username?: string;
  password?: string;
  tls?: ITlsOutbound;
}

interface IOutShadowsocks {
  type: "shadowsocks";
  tag: string;
  server: string;
  server_port: number;
  method: string;
  password: string;
  plugin?: string;
  plugin_opts?: string;
  network?: "tcp" | "udp";
  udp_over_tcp?: boolean;
  multiplex?: IMultiplex;
}

interface IOutVmess {
  type: "vmess";
  tag: string;
  server: string;
  server_port: number;
  uuid: string;
  security?: string;
  alter_id?: number;
  global_padding?: boolean;
  authenticated_length?: boolean;
  network?: "tcp" | "udp";
  tls?: ITlsOutbound;
  packet_encoding?: string;
  multiplex?: IMultiplex;
  transport?: IV2rayTransport;
}

interface IOutTrojan {
  type: "trojan";
  tag: string;
  server: string;
  server_port: number;
  password: string;
  network?: "tcp" | "udp";
  tls?: ITlsOutbound;
  multiplex?: IMultiplex;
  transport?: IV2rayTransport;
}

interface IOutWireGuard {
  type: "wireguard";
  tag: string;
  server: string;
  server_port: number;
  system_interface?: boolean;
  interface_name?: string;
  local_address: string[];
  private_key: string;
  peer_public_key: string;
  pre_shared_key?: string;
  mtu?: number;
  network?: "tcp" | "udp";
}

interface IOutHysteria {
  type: "hysteria";
  tag: string;
  server: string;
  server_port: number;
  up: string;
  up_mbps: number;
  down: string;
  down_mbps: number;
  obfs?: string;
  auth?: string;
  auth_str?: string;
  recv_window_conn?: number;
  recv_window?: number;
  disable_mtu_discovery?: boolean;
  network?: "tcp" | "udp";
  tls: ITlsOutbound;
}

interface IOutShadowtls {
  type: "shadowtls";
  tag: string;
  server: string;
  server_port: number;
  version?: number;
  password?: string;
  tls: ITlsOutbound;
}

interface IOutShadowsocksr {
  type: "shadowsocksr";
  tag: string;
  server: string;
  server_port: number;
  method: string;
  password: string;
  obfs: string;
  obfs_param: string;
  protocol: string;
  protocol_param: string;
  network?: "tcp" | "udp";
}

interface IOutVless {
  type: "vless";
  tag: string;
  server: string;
  server_port: number;
  uuid: string;
  network?: "tcp" | "udp";
  tls?: ITlsOutbound;
  packet_encoding?: string;
  transport?: IV2rayTransport;
}

interface IOutTor {
  type: "tor";
  tag: string;
  executable_path?: string;
  extra_args?: any[];
  data_directory?: string;
  torrc?: {
    ClientOnly: number;
  };
}

interface IOutSsh {
  type: "ssh";
  tag: string;
  server: string;
  server_port?: number;
  user?: string;
  password?: string;
  private_key?: string;
  private_key_path?: string;
  private_key_passphrase?: string;
  host_key_algorithms?: any[];
  client_version?: string;
}

interface IOutSelector {
  type: "selector";
  tag: string;
  outbounds: string[];
  default?: string;
}

interface IOutUrltest {
  type: "urltest";
  tag: string;
  outbounds: string[];
  url?: string;
  interval?: string;
  tolerance?: number;
}
