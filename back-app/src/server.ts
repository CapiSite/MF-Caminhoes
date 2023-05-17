import app, { init } from "./app";

const port = process.env.BACKEND_PORT || 5000

init().then(() =>{
  app.listen(port, () => console.log(port))
})