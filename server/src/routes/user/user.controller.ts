import { editProfile, getUserProfile, uploadImageToCloudinary } from '../../models/user.model.js';

async function httpGetUserProfile(req: any, res: any) {
  const displayName = req.params.displayName;

  const userProfile = await getUserProfile(displayName);

  return res.status(200).json(userProfile);
}

async function updateProfile(req: any, res: any) {
  const userId: string = req.user;

  if (req.params.userId === userId) {
    try {
      const results = await Promise.all(editProfile(userId, req.body));

      return res.status(200).json({ message: results });
    } catch (err) {
      console.log(err);

      return res.status(400).json({ error: err });
    }
  }
}

async function httpUploadImage(req: any, res: any) {
  const userId: string = req.user;
  const fileStr: string = req.body.data;
  const response = await uploadImageToCloudinary(userId, fileStr);

  if (response === 'Error') {
    return res.status(500).json({ error: 'Something went wrong, failed to upload image!' });
  } else {
    return res
      .status(200)
      .json({ message: 'Successfully uploaded image!', url: response?.secure_url });
  }
}

export { updateProfile, httpUploadImage, httpGetUserProfile };
