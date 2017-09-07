# Con-SO-Pretty! 
> Node console.log sexification. 

## TL;DR
Easy and extensible Node.js Console Coloring and Formatting. 
Uses [RenderKid](https://github.com/AriaMinaei/RenderKid) to make your log *prinkle like diamond*.


## Example
```javascript 
const con = new ConsoPretty();
con.start(true);
console.log("Test Render", {test: 1, object: 2, for: "util"});
console.error("Test Render", {test: 1, object: 2, for: "util"});
console.debug("Test Render", {test: 1, object: 2, for: "util"});
console.info("Test Render", {test: 1, object: 2, for: "util"});
console.warn("Test Render", {test: 1, object: 2, for: "util"});
```
### Result

![Example Output](/img/example.png?raw=true "Example Output")
