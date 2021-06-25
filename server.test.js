const createServer = require("./server");
const app = createServer()

beforeAll(() =>{
    if (!module.parent){
        app.listen(8080);
        console.log("Listening port 8080....");
    }
})

module.exports = app