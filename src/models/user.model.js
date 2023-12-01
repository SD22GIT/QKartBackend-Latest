const mongoose = require("mongoose");
// NOTE - "validator" external library and not the custom middleware at src/middlewares/validate.js
const validator = require("validator");
const config = require("../config/config");

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Complete userSchema, a Mongoose schema for "users" collection
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type:String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      required: true,
      trim: true,
      minlength: 8
    },
    walletMoney: {
      type:Number,
      required: true,
      default:config.default_wallet_money
    },
    address: {
      type:String,
      required: true,
      trim: true,
      default: config.default_address
    },
  },
  // Create createdAt and updatedAt fields automatically
  {
    timestamps: true,
  }
);

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement the isEmailTaken() static method
/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email) {
  return this.exists({email: email});
};



// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS
/*
 * Create a Mongoose model out of userSchema and export the model as "User"
 * Note: The model should be accessible in a different module when imported like below
 * const User = require("<user.model file path>").User;
 */
/**
 * @typedef User
 */

const user = mongoose.model("User", userSchema);
module.exports ={ User: user};
//Original Schema
// const userSchema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//     },
//     password: {
//       type: String,
//       validate(value) {
//         if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
//           throw new Error(
//             "Password must contain at least one letter and one number"
//           );
//         }
//       },
//     },
//     walletMoney: {
//     },
//     address: {
//       type: String,
//       default: config.default_address,
//     },
//   },
//   // Create createdAt and updatedAt fields automatically
//   {
//     timestamps: true,
//   }
// );
