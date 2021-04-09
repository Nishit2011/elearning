const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { default: validator } = require("validator");
const Course = require("./courses");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Email is required"],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email format");
        }
      },
    },
    password: {
      type: String,
      minlength: 6,
      trim: true,
      required: [true, "Password is required"],
      validate(value) {
        if (value === "password") {
          throw new Error("Password cant be password");
        }
      },
    },
    streetAddress: {
      type: String,
    },
    pincode: {
      type: Number,
      trim: true,
      required: [true, "Pincode is required"],
      validate(value) {
        console.log(String(value).length);
        if (String(value).length !== 6) {
          throw new Error("Pincode should only be 6 characters length");
        }
      },
    },
    avatar: {
      type: Buffer,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("course", {
  ref: "course",
  localField: "_id",
  foreignField: "author",
});

userSchema.methods.getAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;
  delete userObj.avatar;
  return userObj;
};

//will has the password before saving it to database
userSchema.pre("save", async function (next) {
  const user = this;
  //hash the password only if it has not been modified
  if (user.isModified("password")) {
    user.password = await bcryptjs.hash(user.password, 8);
  }

  next();
});
userSchema.pre("remove", async function (next) {
  const user = this;

  const course = await Course.deleteMany({ author: user._id });

  next();
});
userSchema.statics.findUserByEmailPassword = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("No user found!");
  }
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
