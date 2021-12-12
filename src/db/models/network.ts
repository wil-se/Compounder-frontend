import { db } from "../firestore"
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    QuerySnapshot,
    DocumentData,
  } from "firebase/firestore";


export class Network {
    id: number;
    name: string;
    wss: Array<string>;
    rpc: Array<string>;
    knownAddresses: Map<string, string>;
    logoUrl: string;

    public constructor() {
        this.id = -1;
        this.name = "";
        this.wss = new Array<string>();
        this.rpc = new Array<string>();
        this.knownAddresses = new Map<string, string>();
        this.logoUrl = "";
    }

    public setNetwork(id: number, name: string, wss: Array<string>, rpc: Array<string>, logoUrl: string): void {
        this.id = id;
        this.name = name.toUpperCase();
        this.wss = wss;
        this.rpc = rpc;
        this.logoUrl = logoUrl;
    }

    public async create(): Promise<any> {
        if(this.id !== -1)
            var nets = await this.getById(this.id);
            if(nets.docs.length === 0)
                return await addDoc(await collection(db, "network"), { 
                    networkID: this.id, 
                    name: this.name.toUpperCase(),
                    wss: this.wss,
                    rpc: this.rpc,
                    logoUrl: this.logoUrl,
                });
    }

    public async all(): Promise<QuerySnapshot<DocumentData>> {
        console.log("mbe??");
        return await getDocs(await collection(db, "network"));
    }

    public async getById(nid: number): Promise<QuerySnapshot<DocumentData>> {
        return await getDocs(query(collection(db, "network"), where("networkID", "==", nid)));
    }

    public async update(id: number, newId: number, name: string, wss: Array<string>, rpc: Array<string>, logoUrl: string) {
        var nets = await this.getById(id);
        
        if(nets.docs !== undefined){
            console.log("updating..")
            await updateDoc(nets.docs[0].ref, {
                networkID: newId,
                name: name.toUpperCase(),
                wss: wss,
                rpc: rpc,
                logoUrl: logoUrl,
            });
        }
            
    }

    public async delete(id: number) {
        var nets = await this.getById(id);
        if(nets.docs[0] !== undefined)
            await deleteDoc(nets.docs[0].ref)
    }
}
