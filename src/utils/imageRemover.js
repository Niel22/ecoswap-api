const path = require("path");
const fs = require("fs");

function imageRemover(image) {
	const imagePath = path.join(__dirname, image);

	fs.unlink(image, (err) => {
		if (err) {
			console.log(`Error deleting file : ${err}`);
		} else {
			console.log(`Image ${image} deleted successfully`);
		}
	});
}

module.exports = imageRemover;