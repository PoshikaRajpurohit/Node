const User = require("../models/UserModel");
const path = require("path");
const fs = require("fs");

exports.addUserPage = async (req, res) => {
    return res.render("add_user")
  };

exports.viewAllUserPage = async (req, res) => {

    let users = await User.find();
    return res.render("view_all_user", { users});
  }

exports.addNewUser = async (req, res) => {
  try {
    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
      req.body.image = imagePath;
    }

    let user = await User.create(req.body);
    return res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};

exports.editUserPage = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (user) {
      return res.render("edit_user", { user });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (user) {
      await User.findByIdAndDelete(req.params.id);
      return res.redirect("back"); 
    }
  } catch (error) {
    console.log("Error deleting user:", error);
    return res.status(500).send("Internal Server Error");
  }
};


exports.updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (user) {
      if (req.file) {
        let imagePath = "";
        if (user.image !== "") {
          imagePath = path.join(__dirname, "..", user.image);
          try {
            await fs.unlinkSync(imagePath);
          } catch (error) {
            console.log("Image Not Found...");
          }
        }
        imagePath = `/uploads/${req.file.filename}`;
        req.body.image = imagePath;
      }

      let updateUser = await User.findByIdAndUpdate(user._id, req.body, {
        new: true,
      });
      if (updateUser) {
        return res.redirect("/user/view-users");
      } else {
        return res.redirect("back");
      }
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
  }
};



