const VAULTS = [
  { address: "0x8F89872Be4d7396806926eA1504AAe2535EAeA5C", chain: "bsc" },
  { address: "0x83D6dE1eF922da3C0cf025d250DBb77e8C5ad564", chain: "arbitrum" },
  { address: "0x7D364a9a988Fc72692Bf23777C3c74c4719a062B", chain: "avax" },
  { address: "0x8014bFd6690097f2143b4c5b7BD5fF1A6D50f141", chain: "avax" },
];

const VAULT_ABI = {
  totalAssets: "function totalAssets() view returns (uint256)",
  asset: "function asset() view returns (address)",
};

async function tvl(api) {
  const chain = api.chain;
  const vaults = VAULTS.filter(v => v.chain === chain);
  for (const v of vaults) {
    const asset = await api.call({ target: v.address, abi: VAULT_ABI.asset });
    const total = await api.call({ target: v.address, abi: VAULT_ABI.totalAssets });
    api.add(asset, total);
  }
}

module.exports = {
  methodology: "TVL is the sum of totalAssets() across all LoopFi leverage vaults on BSC, Arbitrum and Avalanche.",
  bsc:      { tvl },
  arbitrum: { tvl },
  avax:     { tvl },
};
