import RenderKid from 'renderkid';
import defaultStyles from './defaultStyles';
import moment from 'moment';
import util from 'util';

const LEVELS = ["log", "debug", "warn", "error", "info"];
/**
 * @module ConsoPretty
 * Main ConsoPretty Class
 */
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


    /**
     * Renders arguments (anything passed to console.[method]) with styles and/or pre|sufffixes and returns rendered text (does not output to to stdout directly.).
     * Note: Non-string arguments are passed through as is, so that they are stringified correctly.
     * 
     * @param {*} arguments - Anything you can pass to console.log can be passed here.
     */
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
     * Explicitly print rendered output to console.log(). Can be used in lieu of binding directly to console object
     * 
     * @param {*} content - Anything you can pass to console.error can be passed here.
     * @return {this}
     */
    log(content) {
        this._output("log", this.render("log", ...content));
        return this;
    }

    /**
     * Explicitly print rendered output to console.debug(). Can be used in lieu of binding directly to console object
     * 
     * @param {*} content - Anything you can pass to console.error can be passed here.
     * @return {this}
     */
    debug(content) {
        this._output("debug", this.render("debug", ...content));
    }

    /**
     * Explicitly print rendered output to console.error(). Can be used in lieu of binding directly to console object
     * 
     * @param {*} content - Anything you can pass to console.error can be passed here.
     * @return {this}
     */
    error(content) {
        this._output("error", this.render("error", ...content));
        return this;
    }

    /**
     * Explicitly print rendered output to console.info(). Can be used in lieu of binding directly to console object
     * 
     * @param {*} content - Anything you can pass to console.error can be passed here.
     * @return {this}
     */
    info(content) {
        this._output("info", this.render("info", ...content));
        return this;
    }

    /**
     * Explicitly print rendered output to console.warn(). Can be used in lieu of binding directly to console object
     * 
     * @param {*} content - Anything you can pass to console.error can be passed here.
     * @return {this}
     */
    warn(content) {
        this._output("warn", this.render("warn", ...content));
        return this;
    }

    /**
     * Write data to the specified output. 
     * NOTE: If console[level] does not exist, console.log will be used under the hood.
     * 
     * @param {string} level - the console method to use to output. One of ["log", "debug", "error", "info", "warn"] 
     * @param {*} output  - Rendered data to be output.
     * @return {this}
     */
    _output(level, output) {
        if (console.hasOwnProperty(level) && typeof console[level] !== 'undefined') {
            console[level](...output);
        } else {
            console.log(...output);
        }
        return this;
    }

    /**
     * Setup ConsoPretty and optionally bind to console object. 
     * 
     * @param {Object} [options]
     * @param {Boolean}[options.bind] - Set to true to bind to console object. 
     * @param {Boolean} [options.timestamp] - Set to true to prepend a timestamp to log messages. 
     * @param {Object} [options.styles] - A Style object can be passed in here that will be applied to log.
     * @return {this}
     */
    start(options) {
        let {
            bind,
            timestamp,
            styles
        } = options;

        if (bind) {
            this.bind();
        }

        if (this._isObject(styles)) {
            this.setStyle(styles);
        }

        if (typeof timestamp === "boolean") {
            this.toggleTimestamp(timestamp);
        }
        return this;
    }

    /**
     * Toggle the timestamp prefix
     * 
     * @param {Boolean} [tog] - The state you want to set the toggle to. If omitted defaults to !this._isTimestamped
     * @return {Boolean} - The new state of the toggle. 
     */
    toggleTimestamp(tog) {
        this._isTimestamped = tog || !this._isTimestamped;
        return this._isTimestamped;
    }


    /**
     * Override the Style object
     * 
     * @param {*} userStyles 
     * @return {this}
     */
    setStyle(userStyles) {
        if (userStyles) {
            this._styles = Object.assign({}, defaultStyles, userStyles);
        }
        return this;

    }

    /**
     * Reset style object to defaultStyles
     * @return {this}
     */
    resetStyles() {
        this._styles = defaultStyles;
        return this;
    }

    /**
     * Bind ConsoPretty to console object. 
     * @return {this}
     */
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

        return this;

    }

    /**
     * Restore the console object to its default state.
     * 
     * @return {this}
     */
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
        return this;

    }

    /**
     * Simple method to determine if value is an Object
     * 
     * @access private
     * @param {*} val - The Value to check
     */
    static _isObject(val) {
        return (val === Object(val));
    }

    /**
     * 
     * Parses arguments passed to console method and returns a templated string for RenderKid
     * @param {*} args - The arguments passed to console method
     * @return {Object} - Formatted object that render() understands. {level: String, text: String, others: [*]}
     */
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