import { RenderContext, Sex, Word } from "./common";

export class Nomen implements Word {
    constructor(public s: string, public sex: Sex) { }
    provideContext(wordinfo: string): Partial<RenderContext> {
        return { sex: this.sex };
    }
    render(context: RenderContext): string {
        return this.s;
    }
}
