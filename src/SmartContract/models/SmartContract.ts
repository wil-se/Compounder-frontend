import { AbiItem } from 'web3-utils'


class SmartContract {
    address: string;
    abi: AbiItem[];

    public constructor(address: string, abi: AbiItem[]) {
        this.address = address;
        this.abi = abi;
    }
}

export default SmartContract