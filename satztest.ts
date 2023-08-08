import { Adjektiv, AdjektivA } from "./Adjektiv";
import { PDek, Sex, Fall, Word } from "./common";
import { Nomen } from "./Nomen";
import { Pronomen } from "./Pronomen";
import { Satz } from "./Satz";





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
    new Satz('$pronomen $adjektiv $nomen bedeutet $adjektiv2 $nomen', { case: Fall.N}),
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