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