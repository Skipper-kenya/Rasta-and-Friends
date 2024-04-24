const { Router } = require("express");
const controlMarkRead = require("../controller/notifications/mark_read");
const controlDeleteAllRead = require("../controller/notifications/delete_all_read");
const controlMarkAllRead = require("../controller/notifications/mark_all_read");
const verifyToken = require("../middleware/verifyToken");

const router = Router();

router.post("/markRead", verifyToken, controlMarkRead);
router.post("/markAllRead", verifyToken, controlMarkAllRead);
router.post("/deleteAllRead", verifyToken, controlDeleteAllRead);

const notificationsRoute = router;

module.exports = notificationsRoute;
