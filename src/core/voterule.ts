export class VoteRule {
    public canAbstain: boolean;
    public canSkip: boolean;
    constructor(type: number) {
        if (type & 1)
            this.canAbstain = true;
        if (type & 2)
            this.canSkip = true;
    }
}