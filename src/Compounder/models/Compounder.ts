import Network from "../../utils/models/Network";
import SafeWeb3 from "../../utils/models/SafeWeb3";
import Web3 from "web3";
import Dex from "./../../Dex/models/Dex"
import MasterChef from "../../MasterChef/models/MasterChef"
import SmartContract from "../../SmartContract/models/SmartContract";


class Compounder {
    pendingFnName: string;
    network: Network;
    safeWeb3: SafeWeb3;
    web3: Web3;
    rewardToken: SmartContract;
    stakeToken: SmartContract;
    exitToken: SmartContract;
    dex: Dex;
    masterChef: MasterChef;

    public constructor(pendingFnName: string, network: Network, safeWeb3: SafeWeb3, 
        rewardToken: SmartContract, stakeToken: SmartContract, exitToken: SmartContract, 
        dex: Dex, masterChef: MasterChef) {
        
        this.pendingFnName = pendingFnName;
        this.network = network;
        this.safeWeb3 = safeWeb3;
        this.web3 = this.safeWeb3.w3();
        this.rewardToken = rewardToken;
        this.stakeToken = stakeToken;
        this.exitToken = exitToken;
        this.dex = dex;
        this.masterChef = masterChef;
    }

    getDex = () => {
        return this.dex;
    }
    
    getPendingTx = async () => {
        let txs = await this.web3.eth.getPendingTransactions();
        return txs;
    }
    
    gasReserve = async () => {
        return await this.web3.eth.getBalance(this.safeWeb3.admin());
    }

    digest = (args: string) => {

        switch (args[0].toLowerCase()) {
            
            case "CHECK":
                console.log("CHECK")
                break;
        
            default:
                console.log('Commands available are CHECK');
                process.exit();
        }
    }
}

export default Compounder