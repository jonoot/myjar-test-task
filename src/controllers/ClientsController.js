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
	static async updateClient(req) {
		const { clientId } = req.params;
		const newFirstName = req.body.firstname;
		const newSurname = req.body.surname;

		if (newFirstName && newSurname) {
			await ClientModel.updateFirstAndLast(
				{
					id: clientId,
					firstname: req.body.firstname,
					surname: req.body.surname,
				},
			);
		} else if (newFirstName) {
			await ClientModel.updateFirst(
				{
					id: clientId,
					firstname: newFirstName,
				},
			);
		} else if (newSurname) {
			await ClientModel.updateLast(
				{
					id: clientId,
					surname: newSurname,
				},
			);
		} else {
			return { message: 'no changes' };
		}

		return { message: 'data updated successfully' };
	}
}


module.exports = ClientsController;