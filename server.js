const app = require('./src/app');
const port = 3055;  
const server = app.listen(port, () => {
    console.log(`WSV ecommert start with port ${port}`);
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Exit server express');
        
    });
});
