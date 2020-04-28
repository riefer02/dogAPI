const fs = require('fs');
const superagent = require('superagent');

//Creating a Promoise #1
const readFilePro = (file) => {
	return new Promise((resolve, reject) => {
		fs.readFile(file, (err, data) => {
			if (err) reject('I could not find the file.');
			resolve(data);
		});
	});
};

//Creating a Promise #2
const writeFilePro = (file, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(file, data, (err) => {
			if (err) reject('Could not write the file');
			resolve('success');
		});
	});
};

//ASYNC AWAIT - BEST PRACTICE
const getDogPic = async () => {
	try {
		const data = await readFilePro(`${__dirname}/dog.txt`);
		console.log(`Breed: ${data}`);

		const res1Pro = superagent.get(
			`https://dog.ceo/api/breed/${data}/images/random`
		);

		const res2Pro = superagent.get(
			`https://dog.ceo/api/breed/${data}/images/random`
		);

		const res3Pro = superagent.get(
			`https://dog.ceo/api/breed/${data}/images/random`
		);

		const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
		const imgs = all.map((el) => el.body.message);
		console.log(imgs);

		await writeFilePro('dog-img.txt', imgs.join('\n'));
		console.log('Random dog image saved to file');
	} catch (err) {
		console.log('Error finding doggo.');
		throw err;
	}
	return '2: Ready :)';
};

//RETRIEVING VALUES FROM AN ASYNC VALUE

(async () => {
	try {
		console.log('1: Getting dog pictures!');
		const x = await getDogPic();
		console.log(x);
		console.log('3: Done getting dog pics!');
	} catch (err) {
		console.log('ERROR');
	}
})();

// getDogPic()
// 	.then((x) => {
//
// 	})
// 	.catch((err) => {
// 		console.log('ERROR');
// 	});

// readFilePro(`${__dirname}/dog.txt`)
// 	.then((data) => {
// 		console.log(`Breed: ${data}`);
// 		return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
// 	})
// 	.then((res) => {
// 		console.log(res.body.message);

// 		return writeFilePro('dog-img.txt', res.body.message);
// 		// fs.writeFile('dog-img.txt', res.body.message, (err) => {
// 		// 	if (err) return console.log(err.message);
// 		// 	console.log('Random dog image saved to file');
// 		// });
// 	})
// 	.then(() => {
// 		console.log('Random dog image saved to file.');
// 	})
// 	.catch((err) => {
// 		console.log(err.message);
// 	});
