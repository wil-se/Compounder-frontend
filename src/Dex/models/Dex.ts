import BigNumber from "bignumber.js"
import Web3 from "web3";
import SmartContract from "../../SmartContract/models/SmartContract";
import SafeWeb3 from "../../utils/models/SafeWeb3";


class Dex {
    safeWeb3: SafeWeb3;
    web3: Web3;
    router: SmartContract;
    usdcAddress: string;
    slippage: number;

    public constructor(safeWeb3: SafeWeb3, router: SmartContract, usdcAddress: string, slippage: number) {
        this.safeWeb3 = safeWeb3;
        this.web3 = this.safeWeb3.w3();
        this.router = router;
        this.usdcAddress = usdcAddress;
        this.slippage = slippage;
    }

    setSlippage = (slippage: number) => {
        this.slippage = slippage;
    }

    getPrice = async (contract: SmartContract, path: Array<string> = []) => {
        
        if(path.length == 0)
            path = [contract.address, this.usdcAddress];

        let token = await this.safeWeb3.getContract(contract);
        let rt_decimals = Number(await token.methods.decimals().call());
        let base_amt = new BigNumber(1).shiftedBy(rt_decimals);
    
        try{
            let amt = await this.safeWeb3.getContract(this.router).methods.getAmountsOut(base_amt, path).call();
            let p = new BigNumber(amt[1]);
            return p.shiftedBy(-6).toNumber();
        }catch(err){
            console.log("Price: "+err);
        }
    }

}

export default Dex