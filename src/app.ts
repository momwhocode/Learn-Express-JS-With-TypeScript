console.log("Hello World");

import { throws } from "assert";
import express, {Request, Response} from "express";

const app = express();

//EXAMPLE 1
app.use(express.json())

// URL encoded params
//app.use(express.urlencoded({extended: true}))

//EXAMPLE 2
app.get("/hello_world", (req: Request, res: Response) =>{
  return res.send("Hello World");
})

//EXAMPLE 3
app.get("/status", (req: Request, res: Response) =>{
  return res.json({
    success: true
  })
})

//EXAMPLE 4
app.get("/url", (req: Request, res: Response) =>{
  return res.redirect("http://example.com")
})

//EXAMPLE 5
// trigger a JSON req
// {
//    "name": "vipala"
// }
app.post("/api/data", (req: Request, res: Response) =>{
  console.log(req.body);

  return res.sendStatus(200);
})

//EXAMPLE 6
app.all("/api/all", (req: Request, res: Response) =>{
  console.log(req.body);
  return res.sendStatus(200);
})

//EXAMPLE 7
app
.route("/hi")
.get((req: Request, res: Response) =>{
  return res.send("You make a GET request");
})
.post((req: Request, res: Response) =>{
  return res.send("You make a POST request");
})
.put((req: Request, res: Response) =>{
  return res.send("You make a PUT request");
})
.delete((req: Request, res: Response) =>{
  return res.send("You make a DELETE request");
})
.all((req: Request, res: Response) =>{
  return res.send("You make a X request");
})

app.listen(8000, () =>{
  console.log("Application listening");
})

//EXAMPLE 8
app.get("/sample",(req: Request, res: Response) => res.sendStatus(200))

//EXAMPLE 9
app.get("/ab*cd",(req: Request, res: Response) => res.send("ab*cd"))

//EXAMPLE 10
app.get("/abc/",(req: Request, res: Response) => res.send("abc"))

//EXAMPLE 11
app.get("/api/ex11/books/:bookId/:authID", (req: Request, res: Response) =>{
  console.log(req.params);

  return res.send(req.params);
})
// Response
// {
//    "bookId": "2",
//    "authID": "1"
// }


//EXAMPLE 12
function handleGetBook(req: Request, res: Response, next: NextFunction) 
{
  console.log(req.params);

  return res.send(req.params);
}

app.get("/api/ex12/books/:bookId/:authID", handleGetBook)


//EXAMPLE 13
function handleGetBookOne(req: Request, res: Response, next: NextFunction) 
{ 
  console.log("first handler");
  console.log(req.params);

  next()
}

function handleGetBookTwo(req: Request, res: Response, next: NextFunction) 
{
  console.log("second handler");
  return res.send(req.params);
}

app.get("/api/ex13/books/:bookId/:authID", [handleGetBookOne, handleGetBookTwo])


//EXAMPLE 14

function middleware(req: Request, res: Response, next: NextFunction) 
{
  // @ts-ignore
  req.name = "Vipala";
  next()
}

app.get(
  "/api/ex14/names", 
  middleware,
  (req: Request, res: Response, next: NextFunction) =>{
  // @ts-ignore
    console.log(req.name);

  return res.send(req.name);
})

//EXAMPLE 15
// multiple wrap middleware
function middlewareOne(req: Request, res: Response, next: NextFunction) 
{
  // @ts-ignore
  req.firstName = "Vipala";
  next()
}

function middlewareTwo(req: Request, res: Response, next: NextFunction) 
{
  // @ts-ignore
  req.lastName = " Xyz";
  next()
}

app.get(
  "/api/ex15/names", 
  [middlewareOne, middlewareTwo],
  (req: Request, res: Response, next: NextFunction) =>{
  // @ts-ignore
    console.log(req.name);

  return res.send(req.firstName + req.lastName);
})

//EXAMPLE 16
// global middleware
function gloablMiddleware(req: Request, res: Response, next: NextFunction) 
{
  // @ts-ignore
  req.firstName = "Vipala";
  next()
}

app.use(gloablMiddleware);

app.get(
  "/api/ex16/names", 
  (req: Request, res: Response, next: NextFunction) =>{
  // @ts-ignore
    console.log(req.name);

  return res.send(req.firstName);
})


//EXAMPLE 17
// Currying

const sampleMiddleware =
({name}: {name: string}) =>
(req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    req.firstName = name;
    next();
  };

app.use(sampleMiddleware({name: "VipalaDoesTech"}));

app.get(
  "/api/ex17/names", 
  (req: Request, res: Response, next: NextFunction) =>{
  // @ts-ignore
    console.log(req.firstName);

  return res.send(req.firstName);
})

//EXAMPLE 18
// Currying

const sampleOneMiddleware =
({name}: {name: string}) =>
(req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    res.locals.name = name;
    next();
  };

app.use(sampleOneMiddleware({name: "VipalaCodes"}));

app.get(
  "/api/ex18/names", 
  (req: Request<{name: "string", autorId: string}, {}, {name: string}, {}>, res: Response, next: NextFunction) =>{
  // @ts-ignore
  console.log(req.params.name);
  console.log(req.body.name);

  return res.send(res.locals.name);
})

//EXAMPLE 19
// error handling

app.get("/error", () => {
  throw new Error("Boom!");
})

//EXAMPLE 19
// async error handling

async function throwsError() {
   throw new Error("Boom!");
}
app.get("/error1", (req, res) => {
  try{
    await throwsError();
    res.sendStatus(200);
  }catch(e){
    res.sendStatus(400).send("Something bad happened");
  }
})

routes(app);