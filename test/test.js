import ConsoPretty from '../lib/ConsoPretty'
//Instantiate and bind to console object
let con = new ConsoPretty();
con.start({bind: true});

//Test output
process.stdout.write("\nThe following outputs should be styled\n");
console.log("Test Render", {test: 1, object: 2, for: "util"});
console.error("Test Render", {test: 1, object: 2, for: "util"});
console.debug("Test Render", {test: 1, object: 2, for: "util"});
console.info("Test Render", {test: 1, object: 2, for: "util"});
console.warn("Test Render", {test: 1, object: 2, for: "util"});

//Return console object to its initial state
con.restore();
process.stdout.write("\nThe Following Should Render WITHOUT Styles\n");
console.log("Test Render", {test: 1, object: 2, for: "util"});
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
        marginRight: "1"
    },
    "value": {
        color: "white"
    },
    "sep": {
        color: "bright-magenta"
    }
}});

//Turn off timestamping
con.toggleTimestamp();

//Rebind console
con.bind();
process.stdout.write("\nThe following should render without timestamp\n");
console.log("Test Render", {test: 1, object: 2, for: "util"});
console.error("Test Render", {test: 1, object: 2, for: "util"});
console.debug("Test Render", {test: 1, object: 2, for: "util"});
console.info("Test Render", {test: 1, object: 2, for: "util"});
console.warn("Test Render", {test: 1, object: 2, for: "util"});

//Test unbound outputs
con.restore();
process.stdout.write("\nThe following are logged with an unbound console. LOG Level\n");
con.log("Test Render", {test: 1, object: 2, for: "util"});
con.error("Test Render", {test: 1, object: 2, for: "util"});
con.debug("Test Render", {test: 1, object: 2, for: "util"});
con.info("Test Render", {test: 1, object: 2, for: "util"});
con.warn("Test Render", {test: 1, object: 2, for: "util"});


process.stdout.write("\nTimestamped explicit methods\n");
con.toggleTimestamp(true);
con.log("Test Render", {test: 1, object: 2, for: "util"});
con.error("Test Render", {test: 1, object: 2, for: "util"});
con.debug("Test Render", {test: 1, object: 2, for: "util"});
con.info("Test Render", {test: 1, object: 2, for: "util"});
con.warn("Test Render", {test: 1, object: 2, for: "util"});