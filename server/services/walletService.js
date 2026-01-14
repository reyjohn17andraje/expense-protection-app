import Wallet from "../models/Wallet.js";

export async function getWallet() {
  let wallet = await Wallet.findOne();
  if (!wallet) wallet = await Wallet.create({ balancePHP: 0 });
  return wallet;
}

export async function applyDelta(delta) {
  const wallet = await getWallet();
  wallet.balancePHP += delta;
  await wallet.save();
  return wallet.balancePHP;
}
