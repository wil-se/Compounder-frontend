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
    DocumentSnapshot
  } from "firebase/firestore";


export class Compounder {
    poolID: string;
    poolNumber: number;
    logoUrl: string;
    name: string;
    tick: number; // MOVE TO GLOBAL CONFIG
    gasBoost: number;
    depositSpeedup: number;
    emergencySpeedup: number;
    harvestSpeedup: number;
    swapSpeedup: number;
    approveSpeedup: number
    theshold: number;
    slippage: number;
    stdGas: number;

    public constructor() {
        this.poolID = "";
        this.poolNumber = -9999;
        this.logoUrl = "";
        this.name = "";
        this.tick = 300;
        this.gasBoost = 1;
        this.depositSpeedup = 1;
        this.emergencySpeedup = 1;
        this.harvestSpeedup = 1;
        this.swapSpeedup = 1;
        this.approveSpeedup = 1;
        this.theshold = 1;
        this.slippage = 1;
        this.stdGas = 0.5;
    }

    public setCompounder(poolID: string, tick: number, gasBoost: number, depositSpeedup: number, emergencySpeedup: number, harvestSpeedup: number, swapSpeedup: number, approveSpeedup: number, theshold: number, slippage: number, stdGas: number) {
        this.poolID = poolID;
        var pool = getDoc(doc(db, "pool", this.poolID))
        this.tick = tick;
        this.gasBoost = gasBoost;
        this.depositSpeedup = depositSpeedup;
        this.emergencySpeedup = emergencySpeedup;
        this.harvestSpeedup = harvestSpeedup;
        this.swapSpeedup = swapSpeedup;
        this.approveSpeedup = approveSpeedup;
        this.theshold = theshold;
        this.slippage = slippage;
        this.stdGas = stdGas;
        pool.then(p => {
            this.poolNumber = p.data().id;
            this.logoUrl = p.data().logoUrl;
            this.name = p.data().name;
        }
        )
    }

    public async getById(nid: string): Promise<DocumentSnapshot<DocumentData>> {
        return await getDoc(doc(db, "compounder", nid))
    }

    public async create(): Promise<any> {
        // TODO: CHECK THAT THIS IS A VALID CONFIG
        var pool = await getDoc(doc(db, "pool", this.poolID))
        return await addDoc(await collection(db, "compounder"), {
            poolID: this.poolID,
            poolNumber: pool.data().id,
            logoUrl: pool.data().logoUrl,
            name: pool.data().name,
            tick: this.tick,
            gasBoost: this.gasBoost,
            depositSpeedup: this.depositSpeedup,
            emergencySpeedup: this.emergencySpeedup,
            harvestSpeedup: this.harvestSpeedup,
            swapSpeedup: this.swapSpeedup,
            approveSpeedup: this.approveSpeedup,
            theshold: this.theshold,
            slippage: this.slippage,
            stdGas: this.stdGas,
        });
    }
    
    public async all(): Promise<QuerySnapshot<DocumentData>> {
        return await getDocs(collection(db, "compounder"));
    }

    public async delete(id: string) {
        await deleteDoc(doc(db, "compounder", id))
    }
}
