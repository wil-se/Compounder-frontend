import { AbiItem } from 'web3-utils'
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


export class Token {
    address: string;
    abi: string;
    network: string;
    name: string;
    logo: string;


    public constructor() {
        this.address = "NO_NAME";
        this.abi = "";
        this.network = "";
        this.name = "";
        this.logo = "";
    }

    public setToken(address: string, abi: string, network: string, name: string, logo: string) {
        this.address = address;
        this.abi = abi;
        this.network = network;
        this.name = name;
        this.logo = logo;
    }

    public async getByAddress(address: string): Promise<QuerySnapshot<DocumentData>> {
        return await getDocs(query(collection(db, "token"), where("address", "==", address)));
    }

    public async create(): Promise<any> {
        // TODO: CHECK THAT THIS IS A VALID ADDRESS
        if(this.address !== undefined)
            var nets = await this.getByAddress(this.address);
            if(nets.docs.length === 0)
                return await addDoc(await collection(db, "token"), { 
                    address: this.address, 
                    abi: this.abi,
                    network: this.network,
                    name: this.name,
                    logo: this.logo,
                });
    }
    
    public async all(): Promise<QuerySnapshot<DocumentData>> {
        return await getDocs(await collection(db, "token"));
    }

    public async delete(address: string) {
        var nets = await this.getByAddress(address);
        if(nets.docs[0] !== undefined)
            await deleteDoc(nets.docs[0].ref)
    }
}
