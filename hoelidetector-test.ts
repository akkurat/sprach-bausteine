import { convert, detectAscii } from "./hoelidetector"



// TODO: this should be in a test
const shortPos =
    `   Ab         C   F G Bb
    Meine Freunde sind alle kriminiell`

const shortNeg =
    `Hans ist so froh, ich mag ihn so`

const shortHoeli =
    `(C)Hans ist so (F)froh, ich mag ihn (Am)so`

const longPos =
    `
    Strophe
    
      Ab         C   F G Bb
    Meine Freunde sind alle kriminiell
    Cm        Ab      H
    Ist doch eeeegal
    
    Refrain
    
      Ab         C   F G Bb
    Meine Freunde sind alle kriminiell
    Cm        Ab      H
    Ist doch eeeegal
    
    `

const longNeg = `
    
    Nach zwei leeren Zeilen gilt jeglicher Text als Kommentar.
    
    Refrain:
    Tra la lalala
    la la lala la la
    `

const tests = {
    shortPos,
    shortNeg,
    shortHoeli,
    longPos,
    longNeg
}

for (const [testname, ascii] of Object.entries(tests)) {
    console.log(ascii)
    console.log(testname, detectAscii(ascii))
    console.log(testname, convert(ascii))
}


