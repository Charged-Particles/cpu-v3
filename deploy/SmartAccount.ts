import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { verifyContract } from '../utils/verifyContract';
import { isHardhat } from '../utils/isHardhat';

const SmartAccount_Deploy: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
	const { ethers, deployments, getNamedAccounts } = hre;
	const { deploy } = deployments;
	const { deployer } = await getNamedAccounts();

	await deploy('SmartAccount', {
		from: deployer,
		args: [],
		log: true,
	});

  if (!isHardhat()) {
    await verifyContract('SmartAccount', await ethers.getContract('SmartAccount'));
  }
};
export default SmartAccount_Deploy;

SmartAccount_Deploy.tags = ['SmartAccount'];
