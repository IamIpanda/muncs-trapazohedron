import { Data } from "./data";

export class Link {
    static source: any;
    
    public static onMessage: (content)=>void;
    public static onSpeak: (content)=>void;
    public static onOther: (content)=>void;
    public static onCall: (content)=>void;
    public static onVote: (content)=>void;

    public static state() {
        if (!this.source) return null;
        return this.source.readyState;
    }
    public static initialize() : void {
        this.source = new window['EventSource'](Data.serverAddress + "/stream/" + Data.countryName);
        this.source.addEventListener('message', (e:any) => this.onMessage(e.data), false);
        this.source.addEventListener('speak', (e:any) => this.onSpeak(e.data), false);
        this.source.addEventListener('other', (e:any) => this.onOther(e.data), false);
        this.source.addEventListener('call', (e:any) => this.onCall(e.data), false);
        this.source.addEventListener('vote', (e:any) => this.onVote(e.data), false);
        this.source.onerror = () => { console.log("Connection Failed.") }
        this.source.onopen = () => { console.log("Connection Opened.") }
    }

    public static async call(appearance: string) {
        let url: string = Data.serverAddress + "/call/" + Data.countryName;
        await fetch(url, { method: 'POST', body: appearance });
    }    

    public static async vote(ticket: string) {
        let url: string = Data.serverAddress + "/vote/" + Data.countryName;
        await fetch(url, { method: 'POST', body: ticket });
    }

    public static async info() : Promise<boolean> {
        let url: string = Data.serverAddress + "/info";
        try {
            let result = await fetch(url);
            let text = await result.text();
            Data.title = text;
            return true;
        }
        catch {
            return false;
        }
    }
}