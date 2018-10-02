const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');

const {TEST_DATABASE_URL} = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

describe("Puzzle App API resource", function(){
	before(function(){
		return runServer(TEST_DATABASE_URL);
	});

	after("", function(){
		return closeServer();
	});

	describe("Root test", function(){
		it('Should return the images', function(){
			return chai.request(app)
			.get('/api/library/images')
			.then(function(res){
				expect(res).to.have.status(200);
				expect(res).to.be.json;
			});

		});
	});
});