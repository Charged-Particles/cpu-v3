import { network } from 'hardhat';
import _ from 'lodash';

const mainnetChains = [ 1, 137, 34443 ];

export const isTestnet = () => {
  const chainId = network.config.chainId ?? 1;
  if (_.includes(mainnetChains, chainId)) {
    return false;
  }
  return true;
};
