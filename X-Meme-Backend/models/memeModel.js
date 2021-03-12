const mongoose = require("mongoose");

// Creating Mongoose Schema
const memeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "A meme must contain a name"],
    },
    url: {
      type: String,
      trim: true,
      required: [true, "A meme must contain a url"],
    },
    caption: {
      type: String,
      trim: true,
      required: [true, "A meme must contain a caption"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, converted) => {
        delete converted._id;
      },
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: (doc, converted) => {
        delete converted._id;
      },
    },
  }
);

// For combination of name, url and caption to be unique
memeSchema.index({ name: 1, url: 1, caption: 1 }, { unique: true });

// Creating and exporting Model
const Meme = mongoose.model("Meme", memeSchema);

module.exports = Meme;
