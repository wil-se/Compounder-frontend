class Network {
    id: number;
    name: string;
    wss: Array<string>;
    rpc: Array<string>;
    knownAddresses: Map<string, string>;

    public constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.wss = new Array<string>();
        this.rpc = new Array<string>();
        this.knownAddresses = new Map<string, string>();
    }
    
}

export default Network