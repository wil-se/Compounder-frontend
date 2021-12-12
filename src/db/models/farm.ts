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
    getDoc,
    DocumentSnapshot,
  } from "firebase/firestore";


export class Farm {
    name: string;
    routerID: string;
    pid: number;
    pendingFName: string;
    hasReferral: boolean;
    masterChefAddress: string;
    masterchefAbi: string;
    stakeTokenID: string;
    rewardTokenID: string;
    logoUrl: string;

    public constructor() {
        this.name = "";
        this.routerID = "";
        this.pid = -99999;
        this.pendingFName = "";
        this.hasReferral = false;
        this.masterChefAddress = "";
        this.masterchefAbi = "";
        this.stakeTokenID = "";
        this.rewardTokenID = "";
        this.logoUrl = "";
    }

    public setFarm(name: string, routerID: string, pid: number, pendingFName: string, hasReferral: boolean, masterChefAddress: string, masterchefAbi: string, stakeTokenID: string, rewardTokenID: string, logoUrl: string): void {
        this.name = name;
        this.routerID = routerID;
        this.pid = pid;
        this.pendingFName = pendingFName;
        this.hasReferral = hasReferral;
        this.masterChefAddress = masterChefAddress;
        this.masterchefAbi = masterchefAbi;
        this.stakeTokenID = stakeTokenID;
        this.rewardTokenID = rewardTokenID;
        this.logoUrl = logoUrl;
    }

    public async create(): Promise<any> {
        // MUST CHECK THAT CONF IS CORRECT
        return await addDoc(await collection(db, "farm"), { 
            name: this.name.toUpperCase(),
            routerID: this.routerID,
            pid: this.pid,
            pendingFName: this.pendingFName,
            hasReferral: this.hasReferral,
            masterchefAddress: this.masterChefAddress,
            masterchefAbi: this.masterchefAbi,
            stakeTokenID: this.stakeTokenID,
            rewardTokenID: this.rewardTokenID,
            logoUrl: this.logoUrl,
        });
    }

    public async all(): Promise<QuerySnapshot<DocumentData>> {
        return await getDocs(await collection(db, "farm"));
    }

    public async getById(nid: string): Promise<DocumentSnapshot<DocumentData>> {
        return await getDoc(doc(db, "farms", nid))
    }

    // public async update(id: number, newId: number, name: string, wss: Array<string>, rpc: Array<string>, logoUrl: string) {
    //     var nets = await this.getById(id);
        
    //     if(nets.docs !== undefined){
    //         console.log("updating..")
    //         await updateDoc(nets.docs[0].ref, {
    //             networkID: newId,
    //             name: name.toUpperCase(),
    //             wss: wss,
    //             rpc: rpc,
    //             logoUrl: logoUrl,
    //         });
    //     }
            
    // }

    public async delete(id: string) {
        await deleteDoc(doc(db, "farm", id))
    }
}