const Koa = require('koa');
const router = require('@koa/router')();
const { koaBody } = require('koa-body');
const postgres = require('postgres');
require('dotenv').config();

const sql = postgres(process.env.POSTGRES_URL, {})
const app = new Koa();

app.use(router.routes())
app.use(router.allowedMethods())

router.get('/api/todos', async (ctx, next) => {
    const todos = await sql`select * from todos order by id`
    console.log(`Todos found: ${todos}`);
    ctx.body = todos;
}).post('/api/todos', koaBody(), async (ctx, next) => {
    console.log(ctx.request.body)
    const { title, completed } = ctx.request.body
    ctx.body = await sql`insert into todos (title, completed) values (${title}, ${completed})`
    ctx.status = 201
    console.log(`Successfully created todo with payload: ${title} and ${completed}`);
}).put('/api/todos/:id', koaBody(), async (ctx, next) => {
    const { id } = ctx.params
    const { completed } = ctx.request.body
    await sql`update todos set completed = ${completed} where id = ${id}`
    console.log(`Successfully updated todo with id: ${id} and completed: ${completed}`);
    ctx.status = 200
}).delete('/api/todos/:id', async (ctx, next) => {
    const { id } = ctx.params
    await sql`delete from todos where id = ${id}`
    ctx.status = 204
    console.log(`Successfully deleted todo with id: ${id}`);
});

console.log('Server listening on port 3000');
console.log(process.env.POSTGRES_URL);
app.listen(3000)
