import RenderKid from 'renderkid';
import defaultStyles from './defaultStyles';
import moment from 'moment';
import util from 'util';

const LEVELS = ["log", "debug", "warn", "error", "info"];

class ConsoPretty {
    constructor() {
        this._isTimestamped = true;
        this._isBound = false;

        this._styles = defaultStyles;
        this._renderer = new RenderKid();

        this._oldStdOut = process.stdout;
        this._oldStdErr = process.stderr;
        this._oldConsoles = {};
        LEVELS.forEach((level) => {
            this._oldConsoles[level] = console[level];
        });

    }

    render() {

        let {
            level,
            text,
            others
        } = ConsoPretty._parseContent([...arguments]);
        let ts = `<ts>${moment.utc().format('YYYY-DD-MM hh:mm:ss')}</ts>`;
        let sep = `<sep>-</sep>`;
        let key = `<key>${level.toUpperCase()}:</key>`
        let markupText = "";
        if (this._isTimestamped) {
            markupText = `${ts}${sep}${key} ${text}`;
        } else {
            markupText = `${key} ${text}`
        }
        this._renderer.style(this._styles[level]);

        return [this._renderer.render(markupText), ...others];

    }

    /**
     * Syntactic sugar for render("log", subject)
     * @param {*} subject 
     */
    log(content) {
        this._output("log", this.render("log", ...content));
    }

    
    debug(content) {
        this._output("debug", this.render("debug", ...content));
    }

    
    error(content) {
        this._output("error", this.render("error", ...content));
    }

    
    info(content) {
        this._output("info", this.render("info", ...content));
    }
    
    warn(content) {
        this._output("warn", this.render("warn", ...content));
    }

    _output(level, output) {
        if (console.hasOwnProperty(level) && typeof console[level] !== 'undefined') {
            console[level](...output);
        } else {
            console.log(...output);
        }
    }

    start(options) {
        let {
            bind,
            timestamp,
            styles
        } = options;

        if (bind) {
            this.bind();
        }

        if (typeof timestamp === "boolean") {
            this.toggleTimestamp(timestamp);
        }
        return this;
    }

    toggleTimestamp(tog) {
        this._isTimestamped = tog || !this._isTimestamped;
    }

    setStyle(userStyles) {
        this._styles = Object.assign({}, defaultStyles, userStyles);
        return this;
    }

    bind() {
        var _this = this;
        LEVELS.forEach((level) => {
            let content;
            if (console.hasOwnProperty(level) && typeof console[level] !== 'undefined') {
                console[level] = function () {
                    content = _this.render(`${level}`, ...arguments);
                    _this._oldConsoles[level](...content);
                };

            } else {
                console[level] = function (content) {
                    content = _this.render(`${level}`, ...arguments);
                    _this._oldConsoles.log(...content);
                };
            }

        });

    }

    restore() {
        var _this = this;
        LEVELS.forEach((level) => {
            let content;
            if (this._oldConsoles.hasOwnProperty(level)) {
                console[level] = this._oldConsoles[level];

            } else {
                delete console[level];
            }

        });

    }

    static _isObject(val) {
        return (val === Object(val));
    }

    static _parseContent(args) {
        let level = args.shift();

        let text = "";
        let others = [];
        for (let i in args) {
            let arg = args[i];
            if (ConsoPretty._isObject(arg)) {
                others.push(arg);
            } else {
                text += `<value>${arg}</value>`
            }
        }
        return {
            level,
            text,
            others
        };
    }
}

module.exports = ConsoPretty;