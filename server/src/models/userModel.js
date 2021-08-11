const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phonNumber: {
            type: String,
            required: true,
            trim: true,
        },
        birthDate: {
            type: String,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        ads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Apartment' }],
    },
    {
        timestamps: true,
    }
);




// hash password before saving
userSchema.pre("save", async function (next) {
    const user = this;

    if (this.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// Compare between given Password to hashed Password
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error({ error: "Unable to login!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error({ error: "Unable to login!" });
    }
    return user;
};



// Hide private fields
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.createdAt;
    delete userObject.updatedAt;
    delete userObject.__v;  
    return userObject;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
