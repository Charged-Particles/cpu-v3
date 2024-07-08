import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { verifyContract } from '../utils/verifyContract';
import { isHardhat } from '../utils/isHardhat';
import { isTestnet } from '../utils/isTestnet';

const ChargedParticles_Deploy: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
	const { ethers, deployments, getNamedAccounts } = hre;
	const { deploy } = deployments;
	const { deployer } = await getNamedAccounts();

	const smartAccount = await ethers.getContract('SmartAccount');

  // Mode SFS Registry
  const srsRegistry = isTestnet()
    ? '0xBBd707815a7F7eb6897C7686274AFabd7B579Ff6'
    : '0x8680CEaBcb9b56913c519c069Add6Bc3494B7020';

  const constructorArgs = [
    '0x000000006551c19487814612e58FE06813775758', // ERC6551Registry - Same on All Chains
    await smartAccount.getAddress(),
    srsRegistry
  ];

	await deploy('ChargedParticles', {
		from: deployer,
		args: constructorArgs,
		log: true,
	});

  if (!isHardhat()) {
    await verifyContract('ChargedParticles', await ethers.getContract('ChargedParticles'), constructorArgs);
  }
};
export default ChargedParticles_Deploy;

ChargedParticles_Deploy.dependencies = ['SmartAccount'];
ChargedParticles_Deploy.tags = ['ChargedParticles'];
