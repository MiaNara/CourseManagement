const Course = require("../model/course");
const courseController = {
    getAllCourse: async (req, res) => {
        try {
            const courses = await Course.find({})
            res.render('course', {
                courses
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },
    createCourse: async (req, res) => {

        try {
            const newCourse = new Course(req.body);
            newCourse.save()
                .then(() => {
                    res.redirect("/course")
                }
                )
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getById: async (req, res) => {
        try {
            const course = await Course.findById(req.params.id);
            res.status(200).json(course)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    updateCourse: async (req, res) => {
        try {
            const course = await Course.findById(req.params.id)
            await course.updateOne({ $set: req.body });
            res.status(200).json({ message: "Update Course" })
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteCourse: async (req, res) => {
        try {
            Course.findByIdAndDelete(req.params.id)
                .then(() => {
                    res.redirect("/course")
                })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = courseController;