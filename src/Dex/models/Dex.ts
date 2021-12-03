import BigNumber from "bignumber.js"
import Web3 from "web3";
import SmartContract from "../../SmartContract/models/SmartContract";
import SafeWeb3 from "../../utils/models/SafeWeb3";
import {Contract} from 'web3-eth-contract';


class Dex {
    safeWeb3: SafeWeb3;
    web3: Web3;
    router: Contract;
    routerAddress: string;
    usdcAddress: string;
    ethAddress: string;
    slippage: number;
    gasBoost: number;
    approveSpeedup: number;
    swapSpeedup: number;

    public constructor(safeWeb3: SafeWeb3, router: SmartContract, usdcAddress: string, ethAddress: string, slippage: number, gasBoost: number, approveSpeedup: number, swapSpeedup: number) {
        this.safeWeb3 = safeWeb3;
        this.web3 = this.safeWeb3.w3();
        this.router = this.safeWeb3.getContract(router);
        this.routerAddress = router.address;
        this.usdcAddress = usdcAddress;
        this.slippage = slippage;
        this.ethAddress = ethAddress;
        this.gasBoost = gasBoost;
        this.approveSpeedup = approveSpeedup;
        this.swapSpeedup = swapSpeedup;
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
            let amt = await this.router.methods.getAmountsOut(base_amt, path).call();
            let p = new BigNumber(amt[1]);
            return p.shiftedBy(-6).toNumber();
        }catch(err){
            console.log("Price: "+err);
        }
    }

    swap = async (contract: SmartContract, path: Array<string> = []) => {
        if( path.length == 0)
            path = [contract.address, this.usdcAddress, this.ethAddress];
        
        let token: Contract = this.safeWeb3.getContract(contract);
        let tokenDecimals: number = Number(await token.methods.decimals().call());
        let tokenBalance: number = Number(await token.methods.balanceOf(this.safeWeb3.admin()).call());
        var parsed: number = new BigNumber(tokenBalance).shiftedBy(-1*tokenDecimals).toNumber();
        var tokenPrice: number = Number(await this.getPrice(contract));
        var asusdc = parsed*tokenPrice;

        console.log("Swapping " + parsed + " rt ( " + asusdc.toFixed(5) + " $)");

        try {
            var tollerant: BigNumber;

            try {
                await this.approve(contract, this.routerAddress);
                var [, amountOut] = await this.router.methods.getAmountsOut(tokenBalance, path).call()[1];
                console.log("AmountOut: "+amountOut);
            } catch(e) {
                console.log("AmountsOut: "+e);
                return 0;
            }

            try {
                tollerant = new BigNumber(amountOut).multipliedBy(100-this.slippage).div(100);
                var gas = await this.router.methods.swapExactTokensForTokensSupportingFeeOnTransferTokens(tokenBalance, tollerant.integerValue(BigNumber.ROUND_FLOOR).toString(), path, this.safeWeb3.admin(), Date.now() + 300).estimateGas({from: this.safeWeb3.admin()});
                console.log("Swap requires "+gas+" gas ("+ gas * this.gasBoost * this.swapSpeedup + ")");
            } catch(e) {
                console.log("Swap EstimateGas: "+e);
                return 0;
            }
            
            try {
                let receipt = await this.router.methods.swapExactTokensForTokensSupportingFeeOnTransferTokens(tokenBalance, tollerant.integerValue(BigNumber.ROUND_FLOOR).toString(), path, this.safeWeb3.admin(), Date.now() + 300).send({from: this.safeWeb3.admin(), gas: gas * this.gasBoost * this.swapSpeedup});
                console.log("swapExactTokensForETH:  " + receipt.transactionHash);
                return tollerant;
            } catch(e) {
                console.log("swapExactTokensForETH: "+e);
                return 0;
            }
        } catch(e) {
            return 0;
        }
    }

    approve = async (contract: SmartContract,  spender = this.routerAddress, amount = '115792089237316195423570985008687907853269984665640564039457584007913129639935') => {
        try{
            var token = await this.safeWeb3.getContract(contract);
            var tokenSymbol = await token.methods.symbol().call();
            var allow = await this.allowance(token, spender);
            var parsedAllowance = new BigNumber(allow).toNumber();
            var parsedAmount = new BigNumber(amount).toNumber();

            if(parsedAllowance < parsedAmount){
                let gas = await token.methods.approve(spender, amount).estimateGas({from: this.safeWeb3.admin()});           
                let receipt = await token.methods.approve(spender, amount).send({from: this.safeWeb3.admin(), gas: gas * this.gasBoost * this.approveSpeedup});
            }
        }catch(err){
            console.log("Approve "+tokenSymbol+": "+err);
        }
    }

    allowance = async(token: Contract, spender = this.router.methods) => {
        return await token.methods.allowance(this.safeWeb3.admin(), spender).call();
    }

    balanceOf = async(token: Contract) => {
        return await token.methods.balanceOf(this.safeWeb3.admin());
    }

}

export default Dex