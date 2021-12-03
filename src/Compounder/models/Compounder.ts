import Network from "../../utils/models/Network";
import SafeWeb3 from "../../utils/models/SafeWeb3";
import Web3 from "web3";
import Dex from "./../../Dex/models/Dex"
import MasterChef from "../../MasterChef/models/MasterChef"
import SmartContract from "../../SmartContract/models/SmartContract";
import BigNumber from "bignumber.js"


class Compounder {
    pendingFnName: string;
    lastProviderId: number;
    network: Network;
    safeWeb3: SafeWeb3;
    web3: Web3;
    rewardToken: SmartContract;
    stakeToken: SmartContract;
    masterChef: MasterChef;
    exitToken: SmartContract;
    dex: Dex;
    gasBoost: number;
    depositSpeedUp: number;
    deltaSeconds: number;
    theshold: number;

    public constructor(pendingFnName: string, lastProviderId: number, network: Network, safeWeb3: SafeWeb3, rewardToken: SmartContract, stakeToken: SmartContract, exitToken: SmartContract, dex: Dex, masterChef: MasterChef, gasBoost: number, depositSpeedUp: number, deltaSeconds: number, theshold: number) {
        this.pendingFnName = pendingFnName;
        this.lastProviderId = lastProviderId;
        this.network = network;
        this.safeWeb3 = safeWeb3;
        this.web3 = this.safeWeb3.w3();
        this.rewardToken = rewardToken;
        this.stakeToken = stakeToken;
        this.masterChef = masterChef;
        this.exitToken = exitToken;
        this.dex = dex;
        this.gasBoost = gasBoost;
        this.depositSpeedUp = depositSpeedUp;
        this.deltaSeconds = deltaSeconds;
        this.theshold = theshold;
    }

    getDex = (): Dex => {
        return this.dex;
    }
    
    getPendingTx = async () => {
        return await this.web3.eth.getPendingTransactions();
    }
    
    gasReserve = async () => {
        return await this.web3.eth.getBalance(this.safeWeb3.admin());
    }

    job = async (i: number) => {
        try {
            console.log("\n[Cycle " + i + "]");

            let rtDecimals = Number(await this.safeWeb3.getContract(this.rewardToken).methods.decimals().call());
            let r = await this.masterChef.pendingRewards();
            // let s = new BigNumber(r).shiftedBy(-1*rt_decimals).toNumber().toFixed(rt_decimals);
            let s = new BigNumber(r).shiftedBy(-1*rtDecimals).toNumber();
            
            let p = await this.dex.getPrice(this.rewardToken);
            let b = await this.gasReserve();
            let rtSymbol = await this.safeWeb3.getContract(this.rewardToken).methods.symbol().call();
            let x = s * Number(p);

            let stDecimals = Number( await this.safeWeb3.getContract(this.stakeToken).methods.decimals().call());
            let stSymbol = await this.safeWeb3.getContract(this.stakeToken).methods.symbol().call();
            let st = await this.masterChef.info(false);

            let stBalance = await this.safeWeb3.getContract(this.stakeToken).methods.balanceOf(this.safeWeb3.admin()).call();
            let stBalanceParsed = new BigNumber(stBalance).shiftedBy(-1*stDecimals);

            console.log("\t-> "+rtSymbol+" price: " + p);
            console.log("\t-> Pending "+rtSymbol+": " + s + "\t(" + x.toFixed(5) + "/" + this.theshold + " $)");
            console.log("\t-> Staking: "+new BigNumber(st[0]).shiftedBy(-1*stDecimals) + " " + stSymbol);
            console.log(`\t-> [${stSymbol}]: ${stBalanceParsed}`);
            console.log("\t-> Gas balance: " + new BigNumber(b).shiftedBy(-18).toNumber().toFixed(5));

            if(s * Number(p) > this.theshold){
                console.log("\t-> [SWAPHARVEST]");
                await this.masterChef.harvest();
                await this.dex.swap(this.rewardToken);
            }else{
                console.log("\t-> [SKIP]");
                console.log("");
            }
            
        }catch(err){
            console.log("[ERROR] " + err);
            this.safeWeb3.reload();
        }
    }

    start = async () => {
        console.log("\n[Compounder]\n\t-> Started with cycle of " + this.deltaSeconds / 1000 / 60 + " minutes");
        var i = 0;
        this.job(i);
        setInterval( () => { this.job(++i); }, this.deltaSeconds);
    }

    digest = (args: Array<string>) => {
        switch (args[0].toLowerCase()) {

            case "check":
                this.masterChef.info(true).then(() => {
                    this.gasReserve().then((r) => {
                        console.log("\n[GAS]");
                        console.log("Gas multiplier active: " + this.gasBoost + "x");
                        console.log("Deposit speedup active: " + this.depositSpeedUp + "x (" + this.depositSpeedUp * this.gasBoost + "x)");
                        console.log("Contract Gas reserve: " + new BigNumber(r).shiftedBy(-18).toNumber() + " WETH");
                        this.gasReserve().then((g) => {
                            console.log("Owner Gas reserve: " + new BigNumber(g).shiftedBy(-18).toNumber() + " WETH\n");
                            process.exit();
                        });
                    });
                }).catch( err => console.log);
                break;
            
            case "deposit":
                this.masterChef.deposit().then(() => { process.exit(); });
                break;
            
            case "harvest":
                this.masterChef.harvest().then(() => { process.exit(); });
                break;
            
            case "swap":
                this.dex.swap(this.rewardToken).then( () => { process.exit(); });
                break;
            
            case "swapharvest":
                this.masterChef.harvest().then( () => {
                    this.dex.swap(this.rewardToken).then( () => {
                        process.exit();
                    });
                });
                break;
            
            case "exit":
                this.masterChef.settleAndExit().then(() => { process.exit(); });
                break;
            
            case "pending":
                this.getPendingTx().then((p) => {
                    console.log(p);
                    process.exit();
                });
                break;
            
            case "info":
                this.masterChef.addresses();
                this.dex.getPrice(this.rewardToken)
                .then( (p) => {
                    this.safeWeb3.getContract(this.rewardToken).methods.symbol().call().then((symb: string) => {
                        console.log(symb + " (RT) Price: "+p);
                        process.exit();
                    });
                }).catch(console.log);
                break;
            
            case "start":
                this.start();
                break;
            
            case "find":
                this.masterChef.pidLookup(this.stakeToken.address).then( (pid) => {
                    if(pid !== undefined ){
                        if(pid >= 0){
                            console.log("Pool Found! PID=[" + pid + "]");
                        }else{
                            console.log("Pool not found. Exit code: " + pid);
                        }
                        process.exit();
                    }
                    
                });
                break;
            
            case "withdraw":
                if(!(args.length > 2)){
                    console.log("USAGE: node main.js withdraw amount_as_string");
                    process.exit();
                }

                this.masterChef.pidLookup(this.stakeToken.address).then( (pid) => {
                    if (pid !== undefined)
                        this.masterChef.withdraw(pid, Number(args[2])).then( () => { process.exit(); });
                });
                break;

            default:
                console.log('Commands available are CHECK | DEPOSIT | EXIT | HARVEST | SWAPHARVEST | PENDING | INFO | FIND');
                process.exit();
        }
    }
}

export default Compounder