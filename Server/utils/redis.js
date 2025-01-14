const { createClient } = require('redis');

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-18771.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 18771
    }
});

client.on('error', err => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client Connected'));

// Connect to Redis
(async () => {
    try {
        await client.connect();
    } catch (err) {
        console.error('Redis connection error:', err);
    }
})();

module.exports = client;