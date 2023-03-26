/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation, and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * https://trufflesuite.com/docs/truffle/reference/configuration
 *
 * Hands-off deployment with Infura
 * --------------------------------
 *
 * Do you have a complex application that requires lots of transactions to deploy?
 * Use this approach to make deployment a breeze 🏖️:
 *
 * Infura deployment needs a wallet provider (like @truffle/hdwallet-provider)
 * to sign transactions before they're sent to a remote public node.
 * Infura accounts are available for free at 🔍: https://infura.io/register
 *
 * You'll need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. You can store your secrets 🤐 in a .env file.
 * In your project root, run `$ npm install dotenv`.
 * Create .env (which should be .gitignored) and declare your MNEMONIC
 * and Infura PROJECT_ID variables inside.
 * For example, your .env file will have the following structure:
 *
 * MNEMONIC = <Your 12 phrase mnemonic>
 * PROJECT_ID = <Your Infura project id>
 *
 * Deployment with Truffle Dashboard (Recommended for best security practice)
 * --------------------------------------------------------------------------
 *
 * Are you concerned about security and minimizing rekt status 🤔?
 * Use this method for best security:
 *
 * Truffle Dashboard lets you review transactions in detail, and leverages
 * MetaMask for signing, so there's no need to copy-paste your mnemonic.
 * More details can be found at 🔎:
 *
 * https://trufflesuite.com/docs/truffle/getting-started/using-the-truffle-dashboard/
 */

require('dotenv').config();
const { MUMBAI_PROVIDER, POLYGON_PROVIDER, OP_PROVIDER_GOERLI, ETHERSCAN_KEY, POLYGONSCAN_KEY, OP_PROVIDER_MAIN } = process.env;
console.log({MUMBAI_PROVIDER, POLYGON_PROVIDER, OP_PROVIDER_GOERLI});
// const HDWalletProvider = require('@truffle/hdwallet-provider');
// truffle-config.js

const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    polygon: {
      provider: () => new HDWalletProvider(privateKey, POLYGON_PROVIDER),
      network_id: 137,
      gas: 2021975, //from ganache-cli output
      gasPrice: 40000000000, //From ganache-cli output
      //gasPrice: 40000000000,
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    mumbai: {
      provider: () => new HDWalletProvider(privateKey, MUMBAI_PROVIDER),
      network_id: 80001,
      gasPrice: 40000000000,
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    optimistic_goerli: {
      provider: () => new HDWalletProvider(privateKey, OP_PROVIDER_GOERLI),
      network_id: 420,
      gas: 10021970, //from ganache-cli output
      gasPrice: 1000000000, //From ganache-cli output
      //gasPrice: 40000000000,
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: false     // Skip dry run before migrations? (default: false for public nets )
    },
    optimistic: {
      provider: () => new HDWalletProvider(privateKey, OP_PROVIDER_MAIN),
      network_id: 10,
      gas: 10021970, //from ganache-cli output
      gasPrice: 1000000, //From ganache-cli output
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: false     // Skip dry run before migrations? (default: false for public nets )
    },
  },
  compilers: {             // Configure your compilers
    solc: {
      version: "0.8.15",    // Fetch exact version from solc-bin (default: truffle's version)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
      }
    }
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    polygonscan: POLYGONSCAN_KEY,
    etherscan: ETHERSCAN_KEY
  }
};
