import should from 'should';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-four-card-mocha-shouldjs/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it("should have a word 'Technology' in section subtitle element", () => {
		const sectionSubtitle =
			document.querySelector('.section__subtitle').textContent;

		sectionSubtitle.should.match(/Technology/g);
	});

	it('should have a strong element as a child/descendant of section head element', () => {
		const sectionHeadEl = document.querySelector('.section__head');
		const isStrongElExist = !!sectionHeadEl.querySelector('strong');

		isStrongElExist.should.be.true();
	});

	it('should have empty alt attribute value of each of card list item image element', () => {
		const cardItemImageElements = document.querySelectorAll('.card__image img');

		const altValues = [];

		for (let i = 0; i < cardItemImageElements.length; i++) {
			const cardItemImageAlt = cardItemImageElements[i].getAttribute('alt');
			altValues.push(cardItemImageAlt);
		}

		altValues.should.matchEach('');
	});
});
