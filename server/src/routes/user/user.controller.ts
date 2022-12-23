import { editProfile } from '../../models/user.model.js';

async function updateProfile(req: any, res: any) {
  const userId: string = req.user;
  if (req.params.userId === userId) {
    try {
      const results = await Promise.all(editProfile(userId, req.body));
      return res.status(200).json({ message: results });
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }
}

export { updateProfile };
