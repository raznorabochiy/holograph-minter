import cli from "cli";
import { Contract, formatEther, JsonRpcProvider, Wallet } from "ethers";
import { ABI, CONTRACT_ADDRESS, RPC_URL } from "./constants";
import { Network } from "./types";
import { getTxLink } from "./utils";

export async function mint(key: string, network: Network) {
  const rpcUrl = RPC_URL[network];
  const provider = new JsonRpcProvider(rpcUrl);
  const wallet = new Wallet(key, provider);
  const { address } = wallet;

  const contract = new Contract(CONTRACT_ADDRESS, ABI, wallet);

  const holographFeeWei = await contract.getHolographFeeWei(1);
  const value = holographFeeWei + (holographFeeWei * 5n / 100n);

  const txArgs = [1];

  let gasLimit = 2_000_000n;

  // Почему-то в Avalanche иногда выдаёт ошибку вызов estimateGas
  try {
    gasLimit = await contract.purchase.estimateGas(...txArgs, {
      value,
    });
  } catch (e) {
    console.log("Can't estimate gas");
  }

  const unsignedTx = await contract.purchase.populateTransaction(
    ...txArgs,
    { value },
  );

  const { gasPrice, maxFeePerGas, maxPriorityFeePerGas } = await provider
    .getFeeData();

  console.log(`Mint in ${network}, price: ${formatEther(value)}`);

  if (
    [Network.POLYGON].includes(network)
  ) {
    unsignedTx.gasPrice = gasPrice;
  } else {
    unsignedTx.maxFeePerGas = maxFeePerGas;
    unsignedTx.maxPriorityFeePerGas = maxPriorityFeePerGas;
  }

  cli.spinner("Send transaction");
  const tx = await wallet.sendTransaction({
    ...unsignedTx,
    gasLimit,
  });

  await provider.waitForTransaction(tx.hash);

  cli.spinner(getTxLink(network, tx.hash), true);
}
