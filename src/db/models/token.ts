import { AbiItem } from 'web3-utils'


export class Token {
    address: string;
    abi: AbiItem[];

    public constructor(address: string, abi: AbiItem[]) {
        this.address = address;
        this.abi = abi;
    }
}
