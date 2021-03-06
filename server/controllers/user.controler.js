const cloudinary = require("cloudinary").v2;
const User = require("../models/user.model");

exports.postAvatar = async (req, res, next) => {
  const userId = req.body.userId;
  try {
    const uploadedImage = await cloudinary.uploader.upload(req.body.image, {
      resource_type: "image",
      public_id: `dev-social/${userId}`,
      overwrite: true,
      notification_url: "https://mysite.example.com/notify_endpoint",
    });
    console.log(uploadedImage.url);
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("Could not find user.");
      error.statusCode = 404;
      throw error;
    }
    console.log(user);
    user.photoURL = uploadedImage.url;
    await user.save();
    res.status(200).json({
      user: {
        id: user._id.toString(),
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        location: user.location,
        jobTitle: user.jobTitle,
        workStatus: user.workStatus,
        skills: user.skills,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateUserInfo = async (req, res, next) => {
  const userUpdatedInfo = req.body.info;
  const userId = req.body.userId;
  console.log(req.body.userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("Could not find user.");
      error.statusCode = 404;
      throw error;
    }
    user.jobTitle = userUpdatedInfo.jobTitle;
    user.location = userUpdatedInfo.location;
    user.workStatus = userUpdatedInfo.workStatus;
    user.skills = userUpdatedInfo.skills;
    await user.save();
    console.log('after save')
    await res.status(200).json({
      user: {
        id: user._id.toString(),
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        location: user.location,
        jobTitle: user.jobTitle,
        workStatus: user.workStatus,
        skills: user.skills,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
