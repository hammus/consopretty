import RenderKid from 'renderkid';
import defaultStyles from './defaultStyles';
import moment from 'moment';
import util from 'util';

const LEVELS = ["log", "debug", "warn", "error", "info"];

export default class ConsoPretty {


    constructor() {
        this._styles = defaultStyles;
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
        let ts = moment.utc().format('YYYY-DD-MM hh:mm:ss');
        this._renderer.style(this._styles[level]);
        return [this._renderer.render(`<ts>${ts}</ts>-<key>${level.toUpperCase()}:</key>${text}`), ...others];

    }

    /**
     * Syntactic sugar for render("log", subject)
     * @param {*} subject 
     */
    log(content) {
        let message = this.render("log", ...content);
    }

    start(bind) {
        if (bind) {
            this.bindConsole();
        }
    }

    bindConsole() {
        var _this = this;
        LEVELS.forEach((level) => {
            let content;
            if (console.hasOwnProperty(level)) {
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