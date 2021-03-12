const Meme = require("./../models/memeModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

// Route Handlers

// Used for checking whether name property is sent in PATCH request
exports.checkBody = (req, res, next) => {
  // if name property is present then send BAD REQUEST
  if (req.body.name) {
    next(new AppError("Name of the meme can't be changed", 400));
  }
  next();
};

// Used for returning 100 Latest Memes with respect to creation time
exports.getAllMemes = catchAsync(async (req, res, next) => {
  // Sorting memes by creation time(decreasing order) and sending first 100 memes
  let memes = await Meme.find()
    .sort("-createdAt")
    .select("name url caption")
    .limit(100);

  res.status(200).json(memes);
});

// Used for returning the meme who's ID is sent via URL parameters
exports.getMeme = catchAsync(async (req, res, next) => {
  const meme = await Meme.findById(req.params.id).select("name url caption");

  // If no meme with that ID exists
  if (!meme) {
    return next(new AppError("Invalid ID", 404));
  }

  res.status(200).json(meme);
});

// Used for creating of a meme
exports.createMeme = catchAsync(async (req, res, next) => {
  const newMeme = await Meme.create(req.body);
  res.status(201).json({ id: newMeme.id });
});

// Used for updating the meme who's ID is sent via URL parameters
exports.updateMeme = catchAsync(async (req, res, next) => {
  const meme = await Meme.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // If no meme with that ID exists
  if (!meme) {
    return next(new AppError("Invalid ID", 404));
  }

  return res.status(204).end();
});
