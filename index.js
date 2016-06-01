import http from 'http';
import app from './server/app';

app.set('port', 3000);

const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Running on :3000');
});
