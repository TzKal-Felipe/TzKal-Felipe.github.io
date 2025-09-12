import { isNearGameObject, isNearOppositeElementPond } from "./helperFunctions";

export class EnvironmentContext {
    constructor(player, helpfulObjects, collisionBlocks){
        this.player = player;
        this.objects = helpfulObjects;
        this.collisionBlocks = collisionBlocks;
        this.state = "neutral";
        this.eventTarget = new EventTarget();
        this.interval = null;
        this.intervalRate = 10;
    }

    checkEnvironment() {
        if (isNearGameObject(this.player, this.objects)) {
            this.state = "positive";
        } else if (isNearOppositeElementPond(this.player, this.collisionBlocks)) {
            this.state = "negative";
        } else {
            this.state = "neutral";
        }
    }

    onChange(callback){
        this.eventTarget.addEventListener("valueChanged", callback);
    }

    start(){
        this.interval = setInterval(() => {
            this.checkEnvironment();
            this.eventTarget.dispatchEvent(new Event("valueChanged"));
        }, this.intervalRate);
    }

    stop(){
        clearInterval(this.interval);
    }
}
