import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
	constructor() {
		this.client = redis.createClient();

		this.client.on('error', (err) => {
			console.error('Redis client error:', err);
		});

		this.getAsync = promisify(this.client.get).bind(this.client);
		this.setAsync = promisify(this.client.set).bind(this.client);
		this.delAsync = promisify(this.client.del).bind(this.client);
	}

	/**
	 * Check if Redis client is connected.
	 * @returns {boolean} true if connected, false otherwise.
	 */
	isAlive() {
		return this.client.connected;
	}

	/**
	 * Get the value of a key in Redis.
	 * @param {string} key - The key to look for.
	 * @returns {string | null} The value of the key, or null if not found.
	 */
	async get(key) {
		return await this.getAsync(key);
	}

	/**
	 * Set a key with a value in Redis and set an expiration time.
	 * @param {string} key - The key to set.
	 * @param {string | number} value - The value to set.
	 * @param {number} duration - The expiration time in seconds.
	 */
	async set(key, value, duration) {
		await this.setAsync(key, value, 'EX', duration);
	}

	/**
	 * Delete a key in Redis.
	 * @param {string} key - The key to delete.
	 */
	async del(key) {
		await this.delAsync(key);
	}
}

const redisClient = new RedisClient();
export default redisClient;
