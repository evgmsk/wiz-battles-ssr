function translator (lang, path, log = 0) {
    class Language {
        constructor(defaultLang, path = 'assets/i18n/') {
            this.lang = defaultLang;
            this.path = path;
            this.defineSource(defaultLang);
            if (log) console.log(this);
        }

        defineSource(lang) {
            this.langSource = require(`../${this.path}${lang}.json`);
            this.lang = lang;
        }
    }

    const i18nLang = new Language(lang, path);

    return function translate(props) {
        let source;
        let string = i18nLang.langSource;
        let {lang, language, keys, insertions = []} = props;
        lang = lang || language;
        if (!lang) {
            throw new Error('Property "language" is undefined')
        }
        if (!keys) {
            throw new Error('Property "keys" (path to value) is undefined')
        }
        const Keys = (Array.isArray(keys) && keys) || (typeof keys === 'string' && keys.split('.'));
        if (!Keys || !Keys.length)
            throw new Error("Invalid 'keys' property passed to react-redux-translate! 'Keys' must be array or string with keys and dots as delimiters");
        if (lang !== i18nLang.lang) {
            i18nLang.defineSource(lang)
        }
        source = i18nLang.langSource;

        if (!source || (source && typeof source !== 'object' && !source[Keys[0]])) {
            throw new Error("Obtained language source is not valid.")
        }
        try {
            string = Keys.reduce((acc, key) => acc[key], source);
        }catch(err) {
            console.error(err);
            throw new Error("Invalid props passed to react-redux-translate. Obtained language source is not valid.")
        }

        if (typeof string !== 'string') {
            throw new Error(`Invalid 'keys' property passed to react-redux-translate! Value to return ${JSON.stringify(string)}`);
        }
        if (insertions.length) {
            return insertions.reduce((acc, ins) => acc.replace('{{}}', ins), string)
        }
        return string;
    }
}

export default translator;
