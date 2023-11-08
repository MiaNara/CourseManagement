const router = require("express").Router();
const courseController = require("../controller/courseController")
const middlewareController = require("../middleware/middlewareController")

router.route("/")
    .get(middlewareController.verifyToken, courseController.getAllCourse)
    .post(middlewareController.verifyToken, courseController.createCourse)
router.route("/:id")
    .get(middlewareController.verifyToken, courseController.getById)
    .put(middlewareController.verifyToken, courseController.updateCourse)
    .delete(middlewareController.verifyToken, courseController.deleteCourse)


module.exports = router