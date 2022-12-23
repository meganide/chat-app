import { editProfile } from '../../models/user.model.js';
async function updateProfile(req, res) {
    const userId = req.user;
    if (req.params.userId === userId) {
        try {
            const results = await Promise.all(editProfile(userId, req.body));
            console.log(results);
            return res.status(200).json({ message: results });
        }
        catch (err) {
            console.log(err);
            return res.status(400).json({ error: err });
        }
    }
}
function httpUploadImage(req, res) {
    const fileStr = req.body.data;
    console.log(fileStr);
}
export { updateProfile, httpUploadImage };
