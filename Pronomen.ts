import { Word, Sex, PDek, RenderContext } from "./common";

export class Pronomen implements Word {
    lookup: Map<Sex, string>;
    constructor(public f: string, public m: string, public n: string, public p: string, private deklination: PDek) {
        this.lookup = new Map([
            [Sex.F, f],
            [Sex.M, m],
            [Sex.N, n],
            [Sex.P, p]
        ]);

    }
    provideContext(wordinfo: string): Partial<RenderContext> {
        return { dek: this.deklination };
    }
    render(context: { sex: Sex; dek: PDek; }): string {
        return this.lookup.get(context.sex);
    }
}
