import { Word, RenderContext } from "./common";

export class Adjektiv implements Word {
    static lookup = new Map([
        // Nominativ 
        ['nfsw', 'e'],
        ['nmsw', 'e'],
        ['nnsw', 'e'],
        ['npsw', 'en'],
        ['nfst', 'e'],
        ['nmst', 'er'],
        ['nnst', 'es'],
        ['npst', 'e'],
        // Akkusative
        ['afsw', 'e'],
        ['amsw', 'e'],
        ['answ', 'e'],
        ['apsw', 'en'],
        ['afst', 'e'],
        ['amst', 'en'],
        ['anst', 'es'],
        ['apst', 'e'],
    ]);
    constructor(public stem: string) {
    }

    provideContext(wordinfo: string): Partial<RenderContext> {
        return {};
    }
    render(context: RenderContext): string {
        let suffix = '';
        suffix = Adjektiv.lookup.get(context.case + context.sex + context.dek);
        return this.stem + suffix;
    }
}
/**
 * Verstehe selber nicht was das für "Adjektive" sind.
 * Im Grunde eine Adjektivierung eines Nomens
 * 
 * Nach meiner Sprachintuition sind diese in allen undekliniert
 * aber können auch nicht am Ende stehen...
 * Ah doch, als richtiges Substantiv wieder
 * Also z.B.:
 * Dieser drecks Tisch. // TODO
 * Der Tisch ist *ein* Dreck.
 */
export class AdjektivA implements Word {
    constructor(public stem: string) {

    }
    provideContext(wordinfo: string): Partial<RenderContext> {
        return {}
    }
    render(context: RenderContext): string {
        return this.stem;
    }
}
