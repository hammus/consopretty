[![npm version](https://badge.fury.io/js/conso-pretty.svg)](https://badge.fury.io/js/conso-pretty)
# Con-SO-Pretty! 
> Node console.log sexification. 

## Install
```bash
npm i conso-pretty
```

## TL;DR
Easy and extensible Node.js Console Coloring and Formatting. 
Uses [RenderKid](https://github.com/AriaMinaei/RenderKid) to make your log *prinkle like diamond*.


## Example
```javascript 
const ConsoPretty = require('conso-pretty');
const cp = new ConsoPretty();
cp.start(true); //Pass true to bind ConsoPretty to console.log(), console.error() etc.

//Then just use your log as normal 
console.log("Test Render", {test: 1, object: 2, for: "util"});
console.error("Test Render", {test: 1, object: 2, for: "util"});
console.debug("Test Render", {test: 1, object: 2, for: "util"});
console.info("Test Render", {test: 1, object: 2, for: "util"});
console.warn("Test Render", {test: 1, object: 2, for: "util"});
```

> All those magic parkles and prinkles!
### Result
![Example Output](https://github.com/hammus/consopretty/raw/master/img/example.png?raw=true "Example Output")

# Usage
There are 2 main methods ConsoPretty uses to output to the terminal:

## 1. Bind to Console
This is probably the only thing 95% of users will need. Using this method, ConsoPretty overrides the native `console` object so you can just log the way you normally do.
References to the original `console.[method]` functions are saved and can be restored later. \

### Example: Automatic Bind
```javascript 
cp.start({bind: true}); //Initialise ConsoPretty and pass bind: true to bind to console.log(), console.error() etc.


//Then just use your log as you normally would
console.log("Test Render", {test: 1, object: 2, for: "util"});
console.error("Test Render", {test: 1, object: 2, for: "util"});
console.debug("Test Render", {test: 1, object: 2, for: "util"});
console.info("Test Render", {test: 1, object: 2, for: "util"});
console.warn("Test Render", {test: 1, object: 2, for: "util"});
```

### Example: Bind manually
```javascript
cp.bind();

//Then just use your log as you normally would
console.log("Test Render", {test: 1, object: 2, for: "util"});
console.error("Test Render", {test: 1, object: 2, for: "util"});
console.debug("Test Render", {test: 1, object: 2, for: "util"});
console.info("Test Render", {test: 1, object: 2, for: "util"});
console.warn("Test Render", {test: 1, object: 2, for: "util"});
```


## 2. Restore original Console
If for some reason you need to restore the original console, you can call the `restore()` method. 

### Example
```javascript
cp.bind();
console.log("Test Render", {test: 1, object: 2, for: "util"});
cp.restore();
console.log("Test Render", {test: 1, object: 2, for: "util"});
```

### Outputs:
![Example Output](https://github.com/hammus/consopretty/raw/master/img/example2.png?raw=true "Example Output")
## 3. Styling
```javascript
cp.bind();
cp.setStyle({
    log: {
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
    }
});

//Turn off timestamping
cp.toggleTimestamp();

//Rebind console
console.log("Test Render", {test: 1, object: 2, for: "util"});
console.error("Test Render", {test: 1, object: 2, for: "util"});
console.debug("Test Render", {test: 1, object: 2, for: "util"});
console.info("Test Render", {test: 1, object: 2, for: "util"});
console.warn("Test Render", {test: 1, object: 2, for: "util"});
```