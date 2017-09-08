import RenderKid from 'renderkid';
import defaultStyles from './defaultStyles';
import moment from 'moment';
import util from 'util';

const LEVELS = ["log", "debug", "warn", "error", "info"];

class ConsoPretty {
    constructor() {
        this._styles = defaultStyles;
        this._isTimestamped = true;
        this._renderer = new RenderKid();

        this._oldStdOut = process.stdout;
        this._oldStdErr = process.stderr;
        this._oldConsoles = {};
        LEVELS.forEach((level) => {
            this._oldConsoles[level] = console[level];
        })

    }


    render() {

        let {
            level,
            text,
            others
        } = ConsoPretty._parseContent([...arguments]);
        let ts = `<ts>${moment.utc().format('YYYY-DD-MM hh:mm:ss')}</ts>`;
        let key = `<key>${level.toUpperCase()}:</key>`
        let markupText = "";
        if(this._isTimestamped) {
            markupText = `${ts}-${key} ${text}`;
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
        let message = this.render("log", ...content);
        _output("log", message);
    }

    _output(level, output) {
        if (console.hasOwnProperty(level)) {
            console[level](...output);
        } else {
            console.log(...output);
        }
    }

    start(options) {
        let {bind, timestamp, styles} = options;
        
        if (bind) {
            this.bindConsole();
        }

        if (typeof timestamp === "boolean" && !timestamp) {
            this.toggleTimestamp();
        }
        return this;
    }

    toggleTimestamp() {
        this._isTimestamped = !this._isTimestamped;
    }

    setStyle(userStyles) {
        this._styles = Object.assign({}, defaultStyles, userStyles);
        return this;
    }

    bindConsole() {
        var _this = this;
        LEVELS.forEach((level) => {
            let content;
            if (console.hasOwnProperty(level) && typeof console[level] !== 'undefined' ) {
                console[level] = function() {
                        content = _this.render(`${level}`, ...arguments);
                        _this._oldConsoles[level](...content);
                };

            } else {
                console[level] = function(content) {
                    content = _this.render(`${level}`, ...arguments);
                    _this._oldConsoles.log(...content);
                };
            }

        });

    }

    resetConsole() {
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

    _generateWrapper(level) {
        return function (content) {
            console[level]();
        }
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