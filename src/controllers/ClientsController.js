const ClientModel = require('../models/ClientModel');
const validator = require('../helpers/validator');

class ClientsController {
	// GET - Returns a list of clients
	static async get() {
		return ClientModel.getList();
	}

	// GET - Returns one client by ID
	static async getOne(req) {
		const { clientId } = req.params;

		return ClientModel.getOne(clientId);
	}

	// POST - Create a client
	static async createOne(req) {
		await validator.validate('ClientModel', req.body);

		return ClientModel.createOne(req.body);
	}

	// DELETE - Delete a client
	static async deleteOne(req) {
		const { clientId } = req.params;

		await ClientModel.deleteById(clientId);

		return { message: 'success' };
	}

	// POST - update a client
	static async updateOne(req) {
		const { clientId } = req.params;
		let client;

		await ClientModel.getOne(clientId).then((result) => {
			client = result;
		});

		if (req.body.firstname) {
			client.firstname = req.body.firstname;
		}

		if (req.body.surname) {
			client.surname = req.body.surname;
		}

		await ClientModel.updateOne(client);

		return { message: 'Data updated successfully' };
	}
}


module.exports = ClientsController;