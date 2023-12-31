import { Adjektiv, AdjektivA } from "./Adjektiv";
import { PDek, Sex, Fall, Word } from "./common";
import { Nomen } from "./Nomen";
import { Pronomen } from "./Pronomen";
import { Satz } from "./Satz";





const diese = new Pronomen('diese', 'dieser', 'dieses', 'diese', PDek.SCHWACH)
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
    new AdjektivA('drecks'),
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

const nomenMz = [

    new Nomen("Dachse", Sex.P),
    new Nomen("Pferde", Sex.P),
    new Nomen("Tücher", Sex.P),
]

const sentemplates = [
    new Satz('$pronomen $adjektiv Gartenzwerg', { sex: Sex.M }),
    new Satz('$diese $adjektiv $tisch#o ist komplett unnütz.', { case: Fall.N }),
    new Satz('$die $adjektiv $tisch#o ist komplett unnütz.', { case: Fall.N }),
    new Satz('$eine $adjektiv $tisch#o ist komplett unnütz.', { case: Fall.N }),
    new Satz('$einige $adjektiv $tisch#o sind komplett unnütz.', { case: Fall.N }),
    new Satz('$pronomen $tisch#o ist $adjektiv#p', { case: Fall.N }),
    new Satz('$eine $nomen#o, $die ist schön', { case: Fall.N }),
    new Satz('$pronomen $nomen#o macht nur Blödsinn', { case: Fall.N }),
    new Satz('Ich gebe dir diesen $adjektiv Köter', { case: Fall.A, sex: Sex.M }),
    new Satz('$eine $adjektiv Clown ist $adjektiv', { case: Fall.A, sex: Sex.F }),
    new Satz('$pronomen $adjektiv $nomen bedeutet $adjektiv2 $nomen', { case: Fall.N }),
    new Satz('$adjektiv $nomen bedeutet $adjektiv2 $nomen2', { case: Fall.N }),
    new Satz('$adjektiv $nomenMz sind alle $adjektiv2', { case: Fall.N })

]


const context: Record<string, Word | Iterable<Word>> = {
    pronomen, diese, adjektiv, adjektiv2: adjektiv,
    kleinkariert, tisch, eine, nomen, nomen2: nomen, die, nomenMz, einige
}


const outdir = new Date().toString();
for (const sentemplate of sentemplates) {

    const out = sentemplate.renderToFs(context, outdir)

    for (let i = 0; i < 100; i++) {
        try {
            const out = sentemplate.render(context)
            console.log(out)
        }
        catch (e) {
            console.log(e)
        }
    }
}