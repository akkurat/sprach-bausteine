export interface SentenceProperties {
    /**
     * Geschlecht des Objektes
     * bei Subjekt spielt es keine rolle... oder?
     * Ah doch, für Possesivsachen
     */
    sex: Sex
    case: Fall
    dek: PDek
}

export enum Fall {
    N = 'n',
    G = 'g',
    D = 'd',
    A = 'a'
}

export interface RenderContext extends SentenceProperties {
}

export interface Word {
    provideContext(wordinfo: string): Partial<RenderContext>
    render(context: RenderContext): string
}

export const enum Sex {
    F = 'f',
    M = 'm',
    N = 'n',
    P = 'p'
}

export enum PDek {
    SCHWACH = 'sw',
    GEMISCHT = 'mix',
    STARK = 'st',
    NICHT = 'not'
}
