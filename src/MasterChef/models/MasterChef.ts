import Web3 from "web3";
import Dex from "../../Dex/models/Dex";
import SmartContract from "../../SmartContract/models/SmartContract";
import SafeWeb3 from "../../utils/models/SafeWeb3"
import BigNumber from "bignumber.js"


class MasterChef {
    safeWeb3: SafeWeb3;
    web3: Web3;
    dex: Dex;
    pid: number;
    pendingFName: string;
    hasReferral: boolean;
    masterChef: SmartContract;
    stakeToken: SmartContract;
    rewardToken: SmartContract;
    gasBoost: number;
    emergencySpeedUp: number;
    depositSpeedUp: number;
    harvestSpeedUp: number;

    public constructor(safeWeb3: SafeWeb3, dex: Dex, pid: number, pendingFName: string, hasReferral: boolean, masterChef: SmartContract, stakeToken: SmartContract, rewardToken: SmartContract, gasBoost: number, emergencySpeedUp: number, depositSpeedUp: number, harvestSpeedUp: number) {
        this.safeWeb3 = safeWeb3;
        this.web3 = this.safeWeb3.w3();
        this.dex = dex;
        this.pid = pid;
        this.pendingFName = pendingFName;
        this.hasReferral = hasReferral;
        this.masterChef = masterChef;
        this.stakeToken = stakeToken;
        this.rewardToken = rewardToken;
        this.gasBoost = gasBoost;
        this.emergencySpeedUp = emergencySpeedUp;
        this.depositSpeedUp = depositSpeedUp;
        this.harvestSpeedUp = harvestSpeedUp;
    }

    setPid = (p: number) => {
        this.pid = p;
    }

    pidLookup = async (stakeAddress: string) => {
        try {
            let l = await this.safeWeb3.getContract(this.masterChef).methods.poolLength().call();
            for(var i = 0; i < l; i++){
                let d = await this.safeWeb3.getContract(this.masterChef).methods.poolInfo(i).call();
                if(String(d.lpToken).toLowerCase() == stakeAddress.toLowerCase()){ return i; }
            }
            return -1;
        } catch(err){
            console.log("Error: "+err);
        }
    }

    addresses = () => {
        console.log("MasterChef Address: " + this.masterChef.address);
        console.log("Owner address: " + this.safeWeb3.admin());
        console.log("ST Address: " + this.stakeToken.address);
        console.log("RT Address: " + this.rewardToken.address);
    }

    info = async (out = true) => {
        try{
            var values = await this.safeWeb3.getContract(this.masterChef).methods.userInfo(this.pid, this.safeWeb3.admin()).call();
            if(out){

                var rtDecimals = Number(await this.safeWeb3.getContract(this.rewardToken).methods.decimals().call());
                var stDecimals = Number(await this.safeWeb3.getContract(this.stakeToken).methods.decimals().call());

                let rewards = await this.pendingRewards();
                let parsed = new BigNumber(rewards).shiftedBy(-1*rtDecimals).toNumber().toFixed(rtDecimals);
                let rtPrice = await this.dex.getPrice(this.rewardToken);
                let rewardsAsUsdc = new BigNumber(Number(rtPrice) * Number(parsed)).toFixed(10);

                let ownerStBal = await this.safeWeb3.getContract(this.stakeToken).methods.balanceOf(this.safeWeb3.admin()).call();
                let ownerRtBal = await this.safeWeb3.getContract(this.rewardToken).methods.balanceOf(this.safeWeb3.admin()).call();
                let ownerEtBal = await this.web3.eth.getBalance(this.safeWeb3.admin());
    
                let rtSymbol = await this.safeWeb3.getContract(this.rewardToken).methods.symbol().call();
                let stSymbol = await this.safeWeb3.getContract(this.stakeToken).methods.symbol().call();
                
                console.log("\n[STAKE]");
                console.log(rtSymbol + " price: " + rtPrice + " $");
                console.log(rtSymbol +" to Harvest: " + parsed  + " " + rtSymbol + " (  " + rewardsAsUsdc + " $ )");
                console.log(stSymbol + " in Staking: " + new BigNumber(values[0]).shiftedBy(-1*rtDecimals).toNumber() + " " + stSymbol);
                console.log("\n[OWNER]");
                console.log("Owner " + stSymbol + " (ST) Balance: " + new BigNumber(ownerStBal).shiftedBy(-1*stDecimals).toNumber() + " " + stSymbol);
                console.log("Owner " + rtSymbol + " (RT) Balance: " + new BigNumber(ownerRtBal).shiftedBy(-1*rtDecimals).toNumber() + " " + rtSymbol);
                console.log("Owner CRO (gas) Balance: " + new BigNumber(ownerEtBal).shiftedBy(-18).toNumber() + " CRO");
            }
            return values;
        }catch(err){
            console.log("Info error: "+err);
            return [0,0];
        }
    }

    pendingRewards = async () => {
        let rewards = await this.safeWeb3.getContract(this.masterChef).methods[this.pendingFName](this.pid, this.safeWeb3.admin()).call();
        return rewards;
    }

    harvest = async () => {
        try{
            let gas = await this.safeWeb3.getContract(this.masterChef).methods.deposit(this.pid, 0).estimateGas({from: this.safeWeb3.admin()});
            console.log("Harvest requires "+gas+" gas. (" + gas * this.gasBoost * this.harvestSpeedUp + ")");
            let receipt = await this.safeWeb3.getContract(this.masterChef).methods.deposit(this.pid, 0).send({from: this.safeWeb3.admin(), gas: gas * this.gasBoost * this.harvestSpeedUp});
            console.log("Harvest : " + receipt.transactionHash);
        }catch(err){
            console.log(err);
        }
    }

    deposit = async () => {
        try{
            let st_decimals = Number(await this.safeWeb3.getContract(this.stakeToken).methods.decimals().call());
            let amt = await this.safeWeb3.getContract(this.stakeToken).methods.balanceOf(this.safeWeb3.admin()).call();
            let parsed_amt = new BigNumber(amt).shiftedBy(-1*st_decimals).toNumber().toFixed(10);
            await this.dex.approve(this.stakeToken);
            console.log(" "); // take time
            let receipt = await this._deposit(this.pid, amt);
            console.log("Deposit: " + receipt.transactionHash + " ("+parsed_amt+")");
        }catch(err){
            console.log("Deposit: " + err);
        }
    }

    _deposit = async (pid: number, amt: number) => {
        let gas, receipt;
        if(!this.hasReferral){
            gas = await this.safeWeb3.getContract(this.masterChef).methods.deposit(pid, amt).estimateGas({from: this.safeWeb3.admin()});
            console.log("Deposit Gas: "+gas + "("+gas * this.gasBoost * this.depositSpeedUp + ")");
            receipt = await this.safeWeb3.getContract(this.masterChef).methods.deposit(pid, amt).send({from: this.safeWeb3.admin(), gas: gas * this.gasBoost * this.depositSpeedUp });
        }else{
            let zero_addr = "0x0000000000000000000000000000000000000000";
            gas = await this.safeWeb3.getContract(this.masterChef).methods.deposit(pid, amt, zero_addr).estimateGas({from: this.safeWeb3.admin()});
            console.log("Deposit Gas: "+gas + "("+gas * this.gasBoost * this.depositSpeedUp + ")");
            receipt = await this.safeWeb3.getContract(this.masterChef).methods.deposit(pid, amt, zero_addr).send({from: this.safeWeb3.admin(), gas: gas * this.gasBoost * this.depositSpeedUp });
        }
        return receipt;
    }

    withdraw = async (pid: number, amt: number) => {
        let gas, receipt;
        gas = await this.safeWeb3.getContract(this.masterChef).methods.withdraw(pid, amt).estimateGas({from: this.safeWeb3.admin()});
        console.log("Withdraw Gas: "+gas + "("+gas * this.gasBoost * this.depositSpeedUp + ")");
        receipt = await this.safeWeb3.getContract(this.masterChef).methods.widthdraw(pid, amt).send({from: this.safeWeb3.admin(), gas: gas * this.gasBoost * this.depositSpeedUp });
        console.log("Withdraw (" + amt + "): " + receipt.transactionHash);
        return receipt;
    }

    settleAndExit = async () => {
        try {
            let gas = await this.safeWeb3.getContract(this.masterChef).methods.emergencyWithdraw(this.pid).estimateGas({from: this.safeWeb3.admin()});
            console.log("SettleAndExit requires " + gas + " gas (" + gas * this.gasBoost * this.emergencySpeedUp  + ")");
            let receipt = await this.safeWeb3.getContract(this.masterChef).methods.emergencyWithdraw(this.pid).send({from: this.safeWeb3.admin(), gas: gas * this.gasBoost * this.emergencySpeedUp}); 
            console.log("SettleAndExit: " + receipt.transactionHash);
        }catch(err){
            console.log("Error: " + err );
        }
    }
}

export default MasterChef