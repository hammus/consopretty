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

### 1. Bind to Console
This is the one you'll probably use the most. Using this method, ConsoPretty overrides the native `console` object so you can just log the way you normally do. 

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


#### Restore original Console
If for some reason you need to restore the original console, you can call the `restore()` method. 
```javascript
cp.bind();
console.log("Test Render", {test: 1, object: 2, for: "util"});
cp.restore();
console.log("Test Render", {test: 1, object: 2, for: "util"});

```

