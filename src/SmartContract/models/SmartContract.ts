import Web3 from "web3";
import SafeWeb3 from "../../utils/models/SafeWeb3";
import { AbiItem } from 'web3-utils'
import {Contract} from 'web3-eth-contract';


class SmartContract {
    address: string;
    abi: AbiItem[];

    public constructor(address: string, abi: AbiItem[]) {
        this.address = address;
        this.abi = abi;
    }
}

export default SmartContract