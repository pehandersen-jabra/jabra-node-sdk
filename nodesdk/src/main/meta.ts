// These models describe the structure of the api-meta.json file supplied by this module (internally and
// automatically generated by generatemeta script as part of build process).
// 
// Nb. For testing and advanced use only. Most API users will not need this.

import { isNodeJs } from './util';

/**
 * Base interface for containing common meta-data for
 * reflective access to API classes, properties, 
 * methods, constructors etc.
 */
export interface SymbolEntry {
    comment?: string;
    name: string;
    documentation: string;
    tsType: string;
    jsType: string;
}

/**
 * Meta-data for reflective access to API classes.
 */
export interface ClassEntry extends SymbolEntry {
    constructors: MethodEntry[];
    methods:  MethodEntry[];
    properties:  PropertyEntry[];
}

/**
 * Meta-data for reflective access to API class properties.
 */
export interface PropertyEntry extends SymbolEntry {
    readonly: boolean;
}

/**
 * Meta-data for reflective access to API class methods.
 */
export interface MethodEntry extends SymbolEntry {
    parameters: ParameterEntry[];
}

/**
 * Meta-data for reflective access to API method parameters.
 */
export interface ParameterEntry extends SymbolEntry {
    optional: boolean;
}

/**
 * The meta API that classes with meta information shold support.
 */
export interface MetaApi {
    getMeta() : ClassEntry; 
}

/**
 * Holds copy of last read meta information file.
 */
let cachedClassesMeta: ClassEntry[] | null = null;

/**
 * Retrieve (synchronously) runtime meta information for API classes that can be used for 
 * reflective lookup of properties, methods etc. Meta information is loaded synchronously
 * at first use and cached so 2nd use will be faster and there is no performance penality
 * for calling multiple times.
 * 
 * Nb. This function is for internal use. Use getMeta on api classes instead.
 */
export function getJabraApiMetaSync() : ClassEntry[] {
    if (!cachedClassesMeta) {
        if (!isNodeJs()) {
            throw new Error("The getJabraApiMetaSync() function needs to run under NodeJs and not in a browser");
        }

        let Path = require('path');
        let Fs = require('fs');

        // Support running from both compiled js and directly from ts though ts-node. Depending on which running,
        // mode, the relative dir will be different so we need to look at least in two different places.
        const searchPaths = [ Path.join(__dirname, ".."),  Path.join(__dirname, "/../../dist") ];

        for (let i = 0; i< searchPaths.length; ++i) {
            const path = Path.normalize(Path.join(searchPaths[i], "/api-meta.json"));
            try {
                if (Fs.existsSync(path)) {
                    cachedClassesMeta = require(path);
                }
            } catch (e) {
                continue;
            }
        }

        if (!cachedClassesMeta) {
            throw new Error("Could not find read meta information at any of the paths " + searchPaths.join(", ") );
        }
    }

    return cachedClassesMeta;
}