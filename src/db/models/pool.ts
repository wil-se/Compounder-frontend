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
    doc,
  } from "firebase/firestore";


export class Pool {
    name: string;
    farmID: string;
    rewardTokenID: string;
    stakeTokenID: string;
    exitTokenID: string;
    id: number;
    logoUrl: string;
    

    public constructor() {
        this.name = "";
        this.farmID = "";
        this.rewardTokenID = "";
        this.stakeTokenID = "";
        this.exitTokenID = "";
        this.id = -9999;
        this.logoUrl = "";
    }

    public setPool(name: string, farmID: string, rewardTokenID: string, stakeTokenID: string, exitTokenID: string, id: number, logoUrl: string) {
        this.name = name;
        this.farmID = farmID;
        this.rewardTokenID = rewardTokenID;
        this.stakeTokenID = stakeTokenID;
        this.exitTokenID = exitTokenID;
        this.id = id;
        this.logoUrl = logoUrl;
    }

    // public async getByAddress(address: string): Promise<QuerySnapshot<DocumentData>> {
    //     return await getDocs(query(collection(db, "token"), where("address", "==", address)));
    // }

    public async create(): Promise<any> {
        // TODO: CHECK THAT THIS IS A VALID POOL
        return await addDoc(await collection(db, "pool"), { 
            name: this.name, 
            farmID: this.farmID,
            rewardTokenID: this.rewardTokenID,
            stakeTokenID: this.stakeTokenID,
            exitTokenID: this.exitTokenID,
            id: this.id,
            logoUrl: this.logoUrl,
        })
    }
    
    public async all(): Promise<QuerySnapshot<DocumentData>> {
        return await getDocs(await collection(db, "pool"));
    }
    
    public async delete(id: string) {
        await deleteDoc(doc(db, "pool", id))
    }
}
