const Koa = require('koa');
const router = require('@koa/router')();
const { koaBody } = require('koa-body');
const postgres = require('postgres');

const sql = postgres("postgres://todoapp:todoapp@backend_pgsql_1:5432/todoapp", {})
const app = new Koa();

app.use(router.routes())
app.use(router.allowedMethods())

router.get('/api/todos', async (ctx, next) => {
    ctx.body = await sql`select * from todos`
}).post('/api/todos', koaBody(), async (ctx, next) => {
    console.log(ctx.request.body)
    const { title, completed } = ctx.request.body
    ctx.body = await sql`insert into todos (title, completed) values (${title}, ${completed})`
}).delete('/api/todos/:id', async (ctx, next) => {
    const { id } = ctx.params
    await sql`delete from todos where id = ${id}`
    ctx.status = 204
});

app.listen(3000)
