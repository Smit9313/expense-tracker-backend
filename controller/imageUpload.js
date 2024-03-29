const path = require('path');

const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage')
const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = require("firebase/auth");
const { auth } = require('../helper/firebase.config');
const createApiResponse = require('../helper/createApiResponse');

async function uploadImage(file, quantity) {
	const storageFB = getStorage();

	await signInWithEmailAndPassword(auth, process.env.FIREBASE_USER, process.env.FIREBASE_AUTH)

	if (quantity === 'single') {
		const dateTime = Date.now();
		const fileName = `images/${dateTime}`
		const storageRef = ref(storageFB, fileName)
		const metadata = {
			contentType: file.type,
		}
		await uploadBytesResumable(storageRef, file.buffer, metadata);
		// Get the download URL
		const downloadURL = await getDownloadURL(storageRef);
		return downloadURL;
	}

	if (quantity === 'multiple') {
		for (let i = 0; i < file.images.length; i++) {
			const dateTime = Date.now();
			const fileName = `images/${dateTime}`
			const storageRef = ref(storageFB, fileName)
			const metadata = {
				contentType: file.images[i].mimetype,
			}

			const saveImage = await Image.create({ imageUrl: fileName });
			file.item.imageId.push({ _id: saveImage._id });
			await file.item.save();

			await uploadBytesResumable(storageRef, file.images[i].buffer, metadata);

		}
		return
	}

}

exports.imageUpload = async (req, res) => {
	const file = {
		type: req.file.mimetype,
		buffer: req.file.buffer
	}
	try {
		const buildImage = await uploadImage(file, 'single');
		return res.json(createApiResponse(true, { imageUrl: buildImage }, "suceess...", 200))
	} catch (err) {
		return res.json(createApiResponse(false, null, "Something went wrong. Please try again later.", 401))
	}
}