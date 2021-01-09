import { EventEmitter } from 'events';
import { createInterface } from 'readline';

export class UIEvents extends EventEmitter {
    verbose;

    constructor(verbose: boolean, prompt?: string, tabsize?: number) {
        super()
        
        this.verbose = verbose;

        if (this.verbose) console.log(`
        INFO: Created a new user interface with prompt ${prompt ? prompt : '<none>'} and tabsize ${tabsize ? tabsize : 4}`
        );
        
        createInterface({
            input: process.stdin,
            output: process.stdout,
            tabSize: tabsize ? tabsize : 4,
            prompt: prompt ? prompt : ''
        })
        .on('line', inp => {
            let msg = inp.split(" ");
        
            switch (msg[0]) {
                case "stop" || "leave" || "exit" || "end" || "kill":
                    console.log("Spam the world, my final message.");
                    process.exit(0);
                case "pause" || "halt" || "wait":
                    console.log("INFO: Paused spamming, type resume or continue to resume.");
                    this.emit('pause');
                    break;
                case "resume" || "continue":
                    console.log("INFO: Resumed spamming.");
                    this.emit('res');
                    break;
                case "add" || "include":
                    console.log("Added " + msg[1]);
                    this.emit('add');
                    break;
                case "delete" || "subtract" || "remove":
                    console.log("INFO: Removed " + msg[1]);
                    this.emit('del');
                    break;
                default:
                    console.error("ERROR: Command not found.");
                    break;
            }
        });
    }
}