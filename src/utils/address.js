import axios from "axios";
import { ethers } from "ethers";

const validateEthereumAddress = (address) => {
  return ethers.utils.isAddress(address);
};

const validateUxtoAddress = async (address, symbol, isTestnet = false) => {
  const coinSymbol = symbol.toLowerCase();
  const network = isTestnet ? "test3" : "main";
  const baseUrl = `https://api.blockcypher.com/v1/${coinSymbol}/${network}/addrs`;

  try {
    const response = await axios.get(`${baseUrl}/${address}`);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

const validateAddress = (address, coin, isTestnet = false) => {
  switch (coin) {
    case "ETH":
      return validateEthereumAddress(address);
    case "BTC":
    case "DOGE":
    case "LTC":
      return validateUxtoAddress(address, coin, isTestnet);
    default:
      throw new Error(`Unsupported coin: ${coin}`);
  }
};

export { validateAddress };
