import { editProfile, uploadImageToCloudinary } from '../../models/user.model.js';
async function updateProfile(req, res) {
    const userId = req.user;
    if (req.params.userId === userId) {
        try {
            const results = await Promise.all(editProfile(userId, req.body));
            return res.status(200).json({ message: results });
        }
        catch (err) {
            console.log(err);
            return res.status(400).json({ error: err });
        }
    }
}
async function httpUploadImage(req, res) {
    const userId = req.user;
    const fileStr = req.body.data;
    const response = await uploadImageToCloudinary(userId, fileStr);
    if (response === 'Error') {
        return res.status(500).json({ error: 'Something went wrong, failed to upload image!' });
    }
    else {
        return res
            .status(200)
            .json({ message: 'Successfully uploaded image!', url: response?.secure_url });
    }
}
export { updateProfile, httpUploadImage };
