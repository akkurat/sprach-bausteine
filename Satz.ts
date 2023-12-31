import{ PathLike, writeFileSync, mkdirSync } from "node:fs"
import * as path from "node:path"
import { rE } from "./randint";
import { SentenceProperties, Fall, PDek, RenderContext, Word } from "./common";

export class Satz {
    sProps: SentenceProperties;
    /**
     *
     *
     * @param s
     */
    constructor(public s: string, properties?: Partial<SentenceProperties>) {
        this.sProps = { sex: undefined, case: Fall.N, dek: PDek.STARK, ...properties };
    }

    renderToFs(context: Record<string, any>, outPath: PathLike) {
        

        let renderContextIn: RenderContext = this.copyCtx();
        const variableinfo: Map<string, string> = this.createAndCheckContext(context);
        mkdirSync(outPath, {recursive:true})

        for (const [variablename, info] of variableinfo) {
            const lookup  = context[variablename];

            const words: Word[] = Array.isArray(lookup) ? lookup : [lookup]

            mkdirSync(path.join(outPath.toString(),variablename ), {recursive:true})
            
            for( const [i,word] of words.entries() )
            {
                writeFileSync(path.join(outPath.toString(), variablename, ''+i), word.provideContext( info ) + word.toString()) 
            }
            

        }







    }

    render(context: Record<string, any>) {
        const variableinfo: Map<string, string> = this.createAndCheckContext(context);

        // Default Context 
        // some sentence don't need all informations
        // e.g. no adjektiv
        let renderContextIn: RenderContext = this.copyCtx();

        // determine the respective word
        // -> only for supporting iterables as word substituion
        const { halfStaticContext, renderContext } = this.halfStaticContext(variableinfo, context, renderContextIn);


        // TODO here: word type order
        
        // creating effective substituions (aka strings)
        const staticContext: Map<string, string> = new Map();
        for (const [vname, word] of halfStaticContext) {
            staticContext.set(vname, word.render(renderContext));
        }

        const replacer = (...match: [substring: string, ...args: any[]]): string => {
            const variableName = match[1];
            const lookup = staticContext.get(variableName);
            if (!lookup) {
                console.warn(`No value supplied for ${variableName}`);
            }
            return lookup;

        };

        const out = this.s.replace(/\$([\p{L}\d]+)(#\w+)?/gu, replacer);
        return out;
    }


    private halfStaticContext(variableinfo: Map<string, string>, context: Record<string, any>, renderContext: RenderContext) {
        const halfStaticContext: Map<string, Word> = new Map();
        for (const [variablename, info] of variableinfo) {
            const lookup = context[variablename];

            let word: Word;

            if (Array.isArray(lookup)) {
                word = rE(lookup);
            }
            else {
                word = lookup;
            }
            const newContext = word.provideContext(info);
            renderContext = { ...renderContext, ...newContext };

            halfStaticContext.set(variablename, word);
        }
        return { halfStaticContext, renderContext };
    }

    private copyCtx(): RenderContext {
        return { ...this.sProps };
    }

    private createAndCheckContext(context: Record<string, any>) {
        const matches = this.s.matchAll(/\$([\p{L}\d]+)(#(\w+))?/gu);

        // Establish all replaceable expressions
        const variableinfo: Map<string, string> = new Map();
        for (const match of [...matches]) {
            variableinfo.set(match[1], match[3]);
        }

        const inexistentVariables = [];

        // Lookup all necessary variables for substituion
        // but don't abort at missing name for usability
        for (const variablename of variableinfo.keys()) {
            if (!context[variablename]) {
                inexistentVariables.push(variablename);
            }
        }

        // 
        if (inexistentVariables.length > 0) {
            throw ReferenceError('Variables missing: ' + inexistentVariables);
        }
        return variableinfo;
    }
}

