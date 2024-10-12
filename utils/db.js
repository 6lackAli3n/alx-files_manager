const { MongoClient } = require('mongodb');

class DBClient {
	constructor() {
		const host = process.env.DB_HOST || 'localhost';
		const port = process.env.DB_PORT || 27017;
		const database = process.env.DB_DATABASE || 'files_manager';
		const uri = `mongodb://${host}:${port}/${database}`;
		
		this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
		this.connected = false;
	}

	async connect() {
		if (!this.connected) {
			await this.client.connect();
			this.connected = true;
		}
	}

	isAlive() {
		return this.connected;
	}

	async nbUsers() {
		await this.connect();
		const db = this.client.db();
		const usersCount = await db.collection('users').countDocuments();
		return usersCount;
	}

	async nbFiles() {
		await this.connect();
		const db = this.client.db();
		const filesCount = await db.collection('files').countDocuments();
		return filesCount;
	}
}

const dbClient = new DBClient();
module.exports = dbClient;
