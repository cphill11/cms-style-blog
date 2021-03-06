const router = require("express").Router();
// use to collect packaged group of API endpoints & prefix w/ the path /api
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");

// use to prefix all dashboard views with /dashboard
const dashboardRoutes = require("./dashboard-route");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);

// generates error message if request an incorrect resource
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
