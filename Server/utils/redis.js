const redis = require('redis');

const client = redis.createClient({
    password: 'aX1JlS6cZw9uVTct51vptYV4Y1Xof0tu',
    socket: {
        host: 'redis-11291.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 11291
    }
});

(async () => {
    await client.connect();
})();

client.on('connect', () => {
    console.log('Redis client connected');
});

client.on('error', (err) => {
    console.error('Redis connection error:', err);
});

module.exports = client;