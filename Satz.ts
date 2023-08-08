import { rE } from "./randint";
import { SentenceProperties, Fall, RenderContext, Word } from "./satztest";
import { PDek } from "./PDek";

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

    render(context: Record<string, any> | Map<string, any>) {

        const matches = this.s.matchAll(/\$([\p{L}\d]+)(#(\w+))?/gu);

        const variableinfo: Map<string, string> = new Map();
        for (const match of [...matches]) {

            variableinfo.set(match[1], match[3]);
        }

        // Default Context 
        let renderContext: RenderContext = { ...this.sProps };

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

        const out = this.s.replaceAll(/\$([\p{L}\d]+)(#\w+)?/gu, replacer);
        return out;
    }
}
