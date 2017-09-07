import ConsoPretty from '../src/ConsoPretty'
//Instantiate and bind to console object
let con = new ConsoPretty();
con.start({bind: true});

//Test output
console.log("Test Render", {test: 1, object: 2, for: "util"});
console.error("Test Render", {test: 1, object: 2, for: "util"});
console.debug("Test Render", {test: 1, object: 2, for: "util"});
console.info("Test Render", {test: 1, object: 2, for: "util"});
console.warn("Test Render", {test: 1, object: 2, for: "util"});

//Return console object to its initial state
con.resetConsole();

console.log("\nTest Render", {test: 1, object: 2, for: "util"});
console.error("Test Render", {test: 1, object: 2, for: "util"});
try { console.debug("Test Render", {test: 1, object: 2, for: "util"}) } catch(e) { console.log("console.debug successfully deleted"); }
console.info("Test Render", {test: 1, object: 2, for: "util"});
console.warn("Test Render", {test: 1, object: 2, for: "util"});

//Change the style of the "log" level output
con.setStyle({log: {
    "ts": {
        color: "magenta",
        marginRight: "1"
    },
    "key": {
        color: "bright-magenta",
        marginRight: "1",
        marginLeft: "1"
    },
    "value": {
        color: "white"
    }
}});

//Turn of timestamping
con.toggleTimestamp();

//Rebind console
con.bindConsole();
console.log("Test Render", {test: 1, object: 2, for: "util"});
console.error("Test Render", {test: 1, object: 2, for: "util"});
console.debug("Test Render", {test: 1, object: 2, for: "util"});
console.info("Test Render", {test: 1, object: 2, for: "util"});
console.warn("Test Render", {test: 1, object: 2, for: "util"});