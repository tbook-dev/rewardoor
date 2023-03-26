// migrations/2_deploy_migration.js

var rewardoorContract = artifacts.require("Rewardoor");
var attnContract = artifacts.require("RewardoorAttestationStation");

module.exports = function(deployer){
  deployer.deploy(rewardoorContract, 
    "https://pub-a2d7a4b34b80401487705ca5e9da20d8.r2.dev/btm/{id}.json",
    "https://pub-a2d7a4b34b80401487705ca5e9da20d8.r2.dev/btm/");

  deployer.deploy(attnContract)
}