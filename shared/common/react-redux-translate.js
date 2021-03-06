import React from 'react';
import PropTypes from 'prop-types';

function translator (defaultLanguage, storeLanguageKey, path, log = 0) {
    if (arguments.length < 3)
        throw new Error("Function 'translator' require at least three arguments. The first one must be default language. The second one must be language key in the store - the same as passed with 'connect'. The third one must be path from the root of the project (directory contained node-modules) to 'i18n' directory (directory contained 'json' language files)");
    class Language {
        constructor(defaultLanguage, path) {
            this.lang = defaultLanguage;
            this.path = path;
            this.defineSource(defaultLanguage);
            if (log) console.log(this);
        }

        defineSource(lang) {
            this.langSource = require(`../../${this.path}${lang}.json`);
            this.lang = lang;
        }
    }

    const i18nLang = new Language(defaultLanguage, path);

    function translate(props) {
        console.log(props)
        let source;
        let string = i18nLang.langSource;
        let {keys, insertions = [], jsx = false} = props;
        let lang = props[storeLanguageKey];
        if (!lang) {
           throw new Error('Property "language" is undefined')
        }
        if (!keys) {
           
throw new Error('Property "keys" (path to value) is undefined')
        }
        const Keys = (Array.isArray(keys) && keys) || (typeof keys === 'string' && keys.split('\.'));
        if (!Keys || !Keys.length)
            throw new Error("Invalid 'keys' property passed to react-redux-translate! 'Keys' must be array or string with keys and dots as delimiters");
        if (lang !== i18nLang.lang) {
            i18nLang.defineSource(lang);
        }
        source = i18nLang.langSource;

        if (!source || (source && typeof source !== 'object' && !source[Keys[0]])) {
            throw new Error("Obtained language source is not valid.");
        }

        try {
            string = Keys.reduce((acc, key) => acc[key], source);
        }catch(err) {
            console.error(err);
            throw new Error("Invalid props passed to react-redux-translate. Obtained language source is not valid.")
        }

        if (typeof string !== 'string') {
            throw new Error(`Invalid 'keys' property passed to react-redux-translate! Value to return ${JSON.stringify(string)} Keys ${JSON.stringify(keys)}`);
        }
        if (insertions.length) {
            return insertions.reduce((acc, ins) => acc.replace('{{}}', ins), string)
        }
        if (!/<\w+>\w?|\w+<\/\w+>/.test(string)) {
            return string;
        } else {
            const res = props => <span dangerouslySetInnerHTML={{__html: props}} />
            return res(string);
        } 
    };
    
    translate.source = i18nLang;

    return translate;
}

export default translator;
