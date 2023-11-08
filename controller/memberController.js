const { findById } = require("../model/orchidSchema");
const Members = require("../model/member")

const userController = {
    getAll: async (req, res) => {
        try {
            const user = await Members.find();
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    deleteMember: async (req, res) => {
        try {
            const user = await Members.findByIdAndDelete(req.params.id);
            return res.status(200).json("Delete usser ok")
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    updateMember: async (req, res) => {
        try {
            const user = await Members.findById(req.params.id);
            user.updateOne({ $set: req.body });
            return res.status(200).json("update ok")
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = userController;