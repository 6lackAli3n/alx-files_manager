import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class DBClient {
	constructor() {
		const host = process.env.DB_HOST || 'localhost';
		const port = process.env.DB_PORT || 27017;
		const database = process.env.DB_DATABASE || 'files_manager';
		const url = `mongodb://${host}:${port}`;

		this.client = new MongoClient(url, { useUnifiedTopology: true });
		this.client.connect()
		.then(() => {
			this.db = this.client.db(database);
		})
		.catch((err) => {
			console.error('MongoDB connection error:', err);
		});
	}

	/**
	 * Check if the MongoDB client is alive (connected).
	 * @returns {boolean} true if connected, false otherwise.
	 */
	isAlive() {
		return this.client.isConnected();
	}

	/**
	 * Get the number of users in the users collection.
	 * @returns {Promise<number>} The number of users.
	 */
	async nbUsers() {
		return this.db.collection('users').countDocuments();
	}

	/**
	 * Get the number of files in the files collection.
	 * @returns {Promise<number>} The number of files.
	 */
	async nbFiles() {
		return this.db.collection('files').countDocuments();
	}
}

const dbClient = new DBClient();
export default dbClient;
