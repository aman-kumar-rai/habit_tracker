import express from "express";

const app = express();

app.get('/health', (_, res) => {
    res.send('I am healthy')
})


export { app }
export default app;