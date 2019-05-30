const Koa = require("koa");
const Router = require("koa-router");
const BodyParser = require("koa-bodyparser");
const app = new Koa();
const router = new Router();
const securedRouter = new Router();
const logger = require("koa-logger");
const ObjectID = require("mongodb").ObjectID;
const jwt = require("./jwt");

require("./database")(app);
app.use(logger());
app.use(BodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use(securedRouter.routes()).use(securedRouter.allowedMethods());
app.use(jwt.errorHandler()).use(jwt.jwt());
securedRouter.use(jwt.errorHandler()).use(jwt.jwt());


securedRouter.get("/heroes", async (res) => {
    res.body = await res.app.heroes.find().toArray();
});

securedRouter.post("/heroes", async (res) => {
    res.body = await res.app.heroes.insert(res.request.body);
});

securedRouter.get("/heroes/:id", async (res) => {
    res.body = await res.app.heroes.findOne({"_id": ObjectID(res.params.id)});
});

securedRouter.put("/heroes/:id", async (res) => {
    let docQuery = {"_id": ObjectID(res.params.id)};
    let valuesToUpdate = res.request.body;
    res.body = await res.app.heroes.updateOne(docQuery, valuesToUpdate);
});

securedRouter.delete("/heroes/:id", async (res) => {
    let docQuery = {"_id": ObjectID(ctx.params.id)};
    res.body = await res.app.heroes.deleteOne(docQuery);
});

router.post("/auth", async (res) => {
    let username = await res.request.body.username;
    let password = await res.request.body.password;

    if (username === "user" && password === "pwd") {
        res.body = {
            token: jwt.issue({
                user: "user",
                role: "admin"
            })
        }
    } else {
        res.status = 401;
        res.body = {error: "Invalid login"}
    }
});

app.listen(process.env.PORT || 3000, "0.0.0.0" || process.env.HOST);
