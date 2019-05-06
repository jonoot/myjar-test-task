const db = require('../helpers/postgres');
const queries = require('./sql/queries');

class ClientModel {
	// Returns a list of clients
	static async getList(search = {}) {
		return db.any(queries.clients.get, search);
	}

	// Returns Client by ID
	static async getOne(clientId) {
		return db.one(queries.clients.getOne, { clientId });
	}

	// Create client
	static async createOne(clientData) {
		return db.one(queries.clients.createOne, clientData);
	}

	// Delete Client by id
	static async deleteById(clientId) {
		return db.none(queries.clients.deleteOne, { clientId });
	}

	// Update client's first and last name
	static async updateFirstAndLast(clientData) {
		return db.none(queries.clients.updateFirstAndLast, clientData);
	}

	// Update client's first name
	static async updateFirst(clientData) {
		return db.none(queries.clients.updateFirst, clientData);
	}

	// Update client's last name
	static async updateLast(clientData) {
		return db.none(queries.clients.updateLast, clientData);
	}
}

module.exports = ClientModel;
