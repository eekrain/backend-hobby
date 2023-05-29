import { config } from 'dotenv';
import http from 'http';

if (process.env.NODE_ENV !== 'production') {
  config();
}
// call after config() to access the env variables
import { app } from './api';
import { ServerSocket } from './utils/socket';

const port = process.env.PORT || 3333;
const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log(`API available on http://localhost:${port}`);
});

export const mySocket = new ServerSocket(httpServer);
