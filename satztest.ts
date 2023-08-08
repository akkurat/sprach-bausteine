import { rE } from "./randint"


interface RenderContext extends SentenceProperties {
}

interface Word {
    provideContext(wordinfo: string): Partial<RenderContext>
    render(context: RenderContext): string
}

const enum Sex {
    F = 'f',
    M = 'm',
    N = 'n',
    P = 'p'
}

class Nomen implements Word {
    constructor(public s: string, public sex: Sex) { }
    provideContext(wordinfo: string): Partial<RenderContext> {
        return { sex: this.sex }
    }
    render(context: RenderContext): string {
        return this.s;
    }
}

enum PDek {
    SCHWACH = 'sw',
    GEMISCHT = 'mix',
    STARK = 'st',
    NICHT = 'not'
}

class Pronomen implements Word {
    lookup: Map<Sex, string>
    constructor(public f: string, public m: string, public n: string, public p: string, private deklination: PDek) {
        this.lookup = new Map([
            [Sex.F, f],
            [Sex.M, m],
            [Sex.N, n],
            [Sex.P, p]
        ])

    }
    provideContext(wordinfo: string): Partial<RenderContext> {
        return { dek: this.deklination }
    }
    render(context: { sex: Sex, dek: PDek }): string {
        return this.lookup.get(context.sex)
    }
}

class AdjektivA implements Word {
    constructor(public stem: string) {

    }
    provideContext(wordinfo: string): Partial<RenderContext> {
        return {}
    }
    render(context: RenderContext): string {
        return this.stem;
    }
}

class Adjektiv implements Word {
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
    ])
    constructor(public stem: string,) {
    }

    provideContext(wordinfo: string): Partial<RenderContext> {
        return {}
    }
    render(context: RenderContext): string {
        let suffix = ''
        suffix = Adjektiv.lookup.get(context.case + context.sex + context.dek)
        return this.stem + suffix;
    }
}

interface SentenceProperties {
    /**
     * Geschlecht des Objektes
     * bei Subjekt spielt es keine rolle... oder?
     * Ah doch, für Possesivsachen
     */
    sex: Sex
    case: Fall
    dek: PDek
}

class Sentence {
    sProps: SentenceProperties
    /**
     * 
     * 
     * @param s 
     */
    constructor(public s: string, properties?: Partial<SentenceProperties>) {
        this.sProps = { sex: undefined, case: Fall.N, dek: PDek.STARK, ...properties }
    }

    render(context: Record<string, any> | Map<string, any>) {

        const matches = this.s.matchAll(/\$([\p{L}\d]+)(#(\w+))?/gu)

        const variableinfo: Map<string, string> = new Map()
        for (const match of [...matches]) {

            variableinfo.set(match[1], match[3])
        }

        // Default Context 
        let renderContext: RenderContext = { ...this.sProps }

        const halfStaticContext: Map<string, Word> = new Map()
        for (const [variablename, info] of variableinfo) {
            const lookup = context[variablename]

            let word: Word

            if (Array.isArray(lookup)) {
                word = rE(lookup)
            }
            else {
                word = lookup
            }
            const newContext = word.provideContext(info)
            renderContext = { ...renderContext, ...newContext }

            halfStaticContext.set(variablename, word)
        }

        const staticContext: Map<string, string> = new Map()
        for (const [vname, word] of halfStaticContext) {
            staticContext.set(vname, word.render(renderContext))
        }

        const replacer = (...match: [substring: string, ...args: any[]]): string => {
            const variableName = match[1]
            const lookup = staticContext.get(variableName)
            if (!lookup) {
                console.warn(`No value supplied for ${variableName}`)
            }
            return lookup

        }

        const out = this.s.replaceAll(/\$([\p{L}\d]+)(#\w+)?/gu, replacer)
        return out
    }
}


const diese = new Pronomen('diese', 'dieser', 'dieser', 'diese', PDek.SCHWACH)
const eine = new Pronomen('eine', 'ein', 'ein', undefined, PDek.STARK)
const die = new Pronomen('die', 'der', 'das', 'die', PDek.SCHWACH)
const jene = new Pronomen('jene', 'jener', 'jener', 'jene', PDek.SCHWACH)
const einige = new Pronomen(undefined, undefined, undefined, 'einige', PDek.STARK)

const pronomen = [
    diese,
    eine,
    die
]

const kleinkariert = new Adjektiv('kleinkariert')
const adjektiv = [
    new AdjektivA('scheiss'),
    new AdjektivA('kack'),
    new Adjektiv('blöd'),
    new Adjektiv('doof'),
    new Adjektiv('klein'),
    new Adjektiv('gross'),
    new Adjektiv('abverreckt'),
    new Adjektiv('dumm'),
    new Adjektiv('quer'),
    new Adjektiv('quarkig'),
    new Adjektiv('langweilig'),
    new Adjektiv('traurig'),
    new Adjektiv('hinterletzt'),
    new Adjektiv('bissig'),
    kleinkariert
]

const tisch = new Nomen("Tisch", Sex.M)
const taube = new Nomen("Taube", Sex.F)
const seefahrt = new Nomen("Seefahrt", Sex.F)
const tuch = new Nomen("Tuch", Sex.N)

const nomen = [
    tisch,
    taube,
    seefahrt,
    new Nomen("Dachs", Sex.M),
    new Nomen("Pferd", Sex.N),
    new Nomen("Hans", Sex.M),
    
]


enum Fall {
    N = 'n',
    G = 'g',
    D = 'd',
    A = 'a'
}

const sentemplates = [
    //new Sentence('$pronomen $adjektiv Gartenzwerg', { sex: Sex.M }),
    // new Sentence('$diese $adjektiv $tisch#o ist komplett unnütz.', { case: Fall.N }),
    // new Sentence('$die $adjektiv $tisch#o ist komplett unnütz.', { case: Fall.N }),
    // new Sentence('$eine $adjektiv $tisch#o ist komplett unnütz.', { case: Fall.N }),
    // new Sentence('$einige $adjektiv $tisch#o sind komplett unnütz.', { case: Fall.N }),
    // new Sentence('$der $tisch#o ist $adjektiv#p', { case: Fall.N }),
    // new Sentence('$eine $nomen#o, $die ist schön', { case: Fall.N }),
    // new Sentence('$pronomen $nomen#o macht nur blödsinn', { case: Fall.N }),
    // new Sentence('Ich gebe dir diesen $adjektiv Köter', { case: Fall.A, sex: Sex.M }),
    // new Sentence('$ein $adjektiv Clown ist $adjektiv', { case: Fall.A, sex: Sex.F }),
    new Sentence('$pronomen $adjektiv $nomen bedeutet $adjektiv2 $nomen', { case: Fall.N}),
    // TODO: adjektiv is sensitiv only to pronomen before it (more or less)

]


const context: Record<string, Word | Iterable<Word>> = { pronomen, diese, adjektiv, adjektiv2: adjektiv, kleinkariert, tisch, eine, nomen, die }


for (let i = 0; i < 100; i++) {
    for (const sentemplate of sentemplates) {
        try {
            const out = sentemplate.render(context)
            console.log(out)
        }
        catch (e) {
            // console.log(e)
        }
    }
}