import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { verifyContract } from '../utils/verifyContract';
import { isHardhat } from '../utils/isHardhat';

const ChargedParticles_Deploy: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
	const { ethers, deployments, getNamedAccounts } = hre;
	const { deploy } = deployments;
	const { deployer } = await getNamedAccounts();

	const smartAccount = await ethers.getContract('SmartAccount');

  const constructorArgs = [
    '0x000000006551c19487814612e58FE06813775758', // ERC6551Registry - Same on All Chains
    await smartAccount.getAddress(),
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
