import cli from "cli";
import random from "lodash/random";
import maxBy from "lodash/maxBy";
import { Wallet } from "ethers";
import { DELAY_FROM_SEC, DELAY_TO_SEC } from "./constants";
import { Network } from "./types";
import { delayProgress, getBalance, loadKeys, waitGas } from "./utils";
import { mint } from "./mint";

const keys = await loadKeys();

const networks = [
  Network.POLYGON,
  Network.AVALANCHE,
  Network.BSC,
  Network.OPTIMISM,
  Network.ARBITRUM,
  Network.MANTLE,
];

for (let i = 0; i < keys.length; i++) {
  const key = keys[i];
  const count = i + 1;
  const { length } = keys;
  const last = i === keys.length - 1;
  const { address } = new Wallet(key);

  console.log(`${count}/${length} address: ${address}`);

  try {
    const nativeBalance = await Promise.all(
      networks.map((network) => getBalance(network, address)),
    );

    const mappedNativeBalance = nativeBalance.map((balance, index) => {
      const network = networks[index];

      return { network, balance };
    });

    const filteredNativeBalance = mappedNativeBalance.filter(
      (item) => item.balance > 0,
    );

    if (filteredNativeBalance.length === 0) {
      console.log("Networks with enough native tokens not found");
      continue;
    }

    const max = maxBy(filteredNativeBalance, (item) => item.balance);
    const { network } = max;

    await waitGas(network);

    await mint(key, network);
  } catch (e) {
    cli.spinner("", true);
    console.log("Error", e);
  }

  if (!last) {
    const delayTimeout = random(DELAY_FROM_SEC, DELAY_TO_SEC);
    await delayProgress(delayTimeout);
  }
}
