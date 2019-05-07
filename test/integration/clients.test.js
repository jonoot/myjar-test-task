const chai = require('chai');

const chaiHttp = require('chai-http');
const rp = require('request-promise-native');
const config = require('../helpers/config');

const { assert, expect } = chai;

chai.use(chaiHttp);

const api = chai.request(config.apiPath);

it('requesting clients should be successful', () => {
	chai.request('http://localhost:3000')
		.get('/api/v1/clients/')
		.end((err, res) => {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
		});
});

it('requesting client by id should be successful', () => {
	chai.request('http://localhost:3000')
		.post('/api/v1/clients/')
		.send({ phoneNumber: '+44076641221199', firstname: 'first', surname: 'last' })
		.then((res) => {
			expect(res).to.have.status(200);
			chai.request('http://localhost:3000')
				.get(`/api/v1/clients/${res.body.client}`)
				.then((response) => {
					expect(response).to.have.status(200);
					expect(response.body).to.have.property('id');
					expect(response.body).to.have.property('phonenumber');
					expect(response.body).to.have.property('firstname');
					expect(response.body).to.have.property('surname');
				});
		})
		.catch((err) => {
			throw err;
		});
});

it('inserting client should return client id', () => {
	chai.request('http://localhost:3000')
		.post('/api/v1/clients/')
		.send({ phoneNumber: '+44076641119899', firstname: 'first', surname: 'last' })
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.have.property('client');
		});
});

it('deleting client should return success', () => {
	chai.request('http://localhost:3000')
		.post('/api/v1/clients/')
		.send({ phoneNumber: '+44076641111199', firstname: 'first', surname: 'last' })
		.then((res) => {
			expect(res).to.have.status(200);
			chai.request('http://localhost:3000')
				.delete(`/api/v1/clients/${res.body.client}`)
				.then((response) => {
					expect(response.body).to.have.property('message')
						.that.equals('success');
				});
		})
		.catch((err) => {
			throw err;
		});
});

it('updating client should return success message', () => {
	chai.request('http://localhost:3000')
		.post('/api/v1/clients/')
		.send({ phoneNumber: '+44076000906299', firstname: 'first', surname: 'last' })
		.then((res) => {
			expect(res).to.have.status(200);
			chai.request('http://localhost:3000')
				.post(`/api/v1/clients/update/${res.body.client}`)
				.send({ firstname: 'new first', surname: 'new last' })
				.then((response) => {
					expect(response).to.have.status(200);
					expect(response.body).to.have.property('message')
						.that.equals('data updated successfully');
				});
		})
		.catch((err) => {
			throw err;
		});
});
