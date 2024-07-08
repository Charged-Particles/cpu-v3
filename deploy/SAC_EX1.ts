import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { verifyContract } from '../utils/verifyContract';
import { isHardhat } from '../utils/isHardhat';

const SAC_EX1_Deploy: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
	const { ethers, deployments, getNamedAccounts } = hre;
	const { deploy } = deployments;
	const { deployer } = await getNamedAccounts();

	await deploy('SmartAccountController_Example1', {
		from: deployer,
		args: [],
		log: true,
	});

  if (!isHardhat()) {
    await verifyContract('SmartAccountController_Example1', await ethers.getContract('SmartAccountController_Example1'));
  }
};
export default SAC_EX1_Deploy;

SAC_EX1_Deploy.tags = ['SAC_EX1'];
