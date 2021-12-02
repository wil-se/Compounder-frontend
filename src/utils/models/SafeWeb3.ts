import Network from "./Network";
import Web3 from "web3";
import {Contract} from 'web3-eth-contract';
import SmartContract from "../../SmartContract/models/SmartContract"
import AbiItem from "web3"


type ProviderConf = {
    timeout: number;
    clientConfig: {
        maxReceivedFrameSize: number,
        maxReceivedMessageSize: number,
        keepalive: boolean,
        keepaliveInterval: number,
    }
    reconnect: {
        auto: boolean,
        delay: number, // ms
        maxAttempts: number,
        onTimeout: boolean
    }
}

type ProviderType = "wss" | "rpc";


class SafeWeb3 {
    lastProviderId: number;
    network: Network;
    web3: Web3;
    adminAccount: string;
    providerType: ProviderType;


    public constructor(network: Network, providerType: ProviderType, secret: string) {
        this.lastProviderId = 0;
        this.network = network;
        this.providerType = providerType;

        let options: ProviderConf = {
            timeout: 30000,
            clientConfig: {
                maxReceivedFrameSize: 100000000,
                maxReceivedMessageSize: 100000000,
                keepalive: true,
                keepaliveInterval: -1
            },
            reconnect: {
                auto: true,
                delay: 1000,
                maxAttempts: 10,
                onTimeout: false
            }
        };

        if(providerType == "wss"){
            this.web3 = new Web3(new Web3.providers.WebsocketProvider(this.network.wss[this.lastProviderId], options));    
        } else {
            this.web3 = new Web3(new Web3.providers.HttpProvider(this.network.rpc[this.lastProviderId], options));
        }
        this.web3.eth.handleRevert = true;
        this.adminAccount = this.web3.eth.accounts.wallet.add(secret).address;

    }

    reload = (persistent = true): void => {
        try{
            if(this.providerType == "wss"){
                this.web3 = new Web3(new Web3.providers.WebsocketProvider(this.network.wss[this.lastProviderId]));    
            } else {
                this.web3 = new Web3(new Web3.providers.HttpProvider(this.network.rpc[this.lastProviderId]));
            }
            this.lastProviderId = ( this.lastProviderId == this.network.wss.length-1 ) ? 0 : this.lastProviderId + 1;
            this.web3.eth.handleRevert = true;
            
        }catch(err){
            if(!persistent){
                console.log("Cannot Instanciate Web3. Exit.");
                process.exit();
            }
            setTimeout(this.reload, 2000);
        }
    }

    getContract = (token: SmartContract): Contract => {
        return new this.web3.eth.Contract(token.abi, token.address);
    }

    w3 = (): Web3 => {
        return this.web3;
    }

    admin = (): string => {
        return this.adminAccount;
    }
}

export default SafeWeb3