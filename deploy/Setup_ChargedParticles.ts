import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ChargedParticles, SmartAccountController_Example1 } from '../typechain-types';
import { performTx } from '../utils/performTx';
import { log } from '../utils/log';

const Setup_ChargedParticles: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
	const { ethers } = hre;

  // Load ChargedParticles
  const chargedParticles: ChargedParticles = await ethers.getContract('ChargedParticles');
  const chargedParticlesAddress = await chargedParticles.getAddress();
  log(` -- Charged Particles Address: ${chargedParticlesAddress}`);

  // Load SmartAccountController_Example1
  const controller: SmartAccountController_Example1 = await ethers.getContract('SmartAccountController_Example1');
  const controllerAddress = await controller.getAddress();
  log(` -- Execution Controller Address: ${controllerAddress}`);

  // Set Default Execution Controller
  await performTx(
    await chargedParticles.setDefaultExecutionController(controllerAddress),
    ' -- Default Execution Controller Set for SmartAccounts!'
  );
};
export default Setup_ChargedParticles;

Setup_ChargedParticles.dependencies = ['ChargedParticles', 'SAC_EX1'];
Setup_ChargedParticles.tags = ['Setup_CPU'];
