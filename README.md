# rewardoor 🤩
![image](https://user-images.githubusercontent.com/6604762/227801100-b77d5c1d-1be3-4639-82ab-18cb5966d359.png)

Rewardoor is a **social impact incentive protocol** powered by **decentralized identity**, helps activity promoters reward authentic contributors free from the twitter platform constraints,  
developed by *tbook team* on ETHGlobal Hackathon Scaling Ethereum.
## try our live demo
[turn your twit into a shareable NFT](HTTPS://rewardoor.tbook.com)   
[rewardoor.tbook.com](HTTPS://rewardoor.tbook.com)
## what we build
Rewardoor aims to build a social impact incentive layer on top of Web 2 and leverage Web 3 technology.  
We want to free users' data and attention value from Web 2 platforms and give control back to the users.  
In Rewardoor, activity promoters or sponsors can directly reward authentic contributors instead of the twitter platform.  
To achieve this goal, we have accomplished the following tasks.
 1. ### Optimism ATTN identity bridge 
We use Optimism AttestationStation idea to achieve a social identity connetor.  
[We write our Rewardoor AttestationStation smart contract](https://optimistic.etherscan.io/address/0xCC1e763FC0eE8010E225aA0b51f378051Ea3B614#code) deployed on Optimism Mainnet.  
We use this contract to connect the blockchain address to a twitter handle, so people could map their offchain identity to their onchain identity. We also mark some twitter behaviors in our AttestationStation contract to the onchain identity.  

2. ### ERC1155 to represent the ownership table of a twitter NFT
we built a tool to help people to mint their promotion twit into a sharable NFT.  
And we use ERC1155 to represent the ownership. And people can airdrop their twit NFT ownership to the contrubutors according to the contrubutions out of the control of twitter platform.  
[This twit ownership NFT contract is also deployed on Optimism Mainnet](https://optimistic.etherscan.io/address/0xc28c619CfB6263946a646F4812F8f0C164904030#code)  

3. ### Ownership vesting plan 
<img width="745" alt="image" src="https://user-images.githubusercontent.com/6604762/227800137-76f25e87-dd59-4cc0-b3ca-2127d8832554.png">
We provide a vesting plan for promoters to award authentic contributors and we plan to add more vesting plans.

## future work
Implement Rewardoor AttestationStation and bring in more social media platforms incentive scenarios.
