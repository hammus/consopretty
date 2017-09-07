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
const con = new ConsoPretty();
con.start(true); //Pass true to bind ConsoPretty to console.[log_level]

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

# Options

