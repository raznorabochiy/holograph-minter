import { Network } from "./types";

export const KEYS_FILENAME = "keys.txt";

export const DELAY_FROM_SEC = 300;
export const DELAY_TO_SEC = 600;

export const MAX_GAS_GWEI = 40;

export const ABI = [
  "function getNativePrice() view returns (uint256)",
  "function purchase(uint256 quantity) payable returns (uint256)",
  "function getHolographFeeWei(uint256 quantity) view returns (uint256 fee)",
];

export const CONTRACT_ADDRESS = "0xcB0Bb5D835A47584fdA53F57bb4193B28d2738dB";

export const RPC_URL = {
  [Network.POLYGON]: "https://polygon-bor.publicnode.com",
  [Network.AVALANCHE]: "https://avalanche.blockpi.network/v1/rpc/public",
  [Network.BSC]: "https://bsc.publicnode.com",
  [Network.OPTIMISM]: "https://1rpc.io/op",
  [Network.ARBITRUM]: "https://arb1.arbitrum.io/rpc",
  [Network.MANTLE]: "https://mantle-mainnet.public.blastapi.io",
  [Network.ETHEREUM]: "https://eth.llamarpc.com",
};

export const TX_SCAN = {
  [Network.POLYGON]: "https://polygonscan.com/tx/",
  [Network.AVALANCHE]: "https://snowtrace.io/tx/",
  [Network.BSC]: "https://bscscan.com/tx/",
  [Network.OPTIMISM]: "https://optimistic.etherscan.io/tx/",
  [Network.ARBITRUM]: "https://arbiscan.io/tx/",
  [Network.MANTLE]: "https://explorer.mantle.xyz/tx/",
};
