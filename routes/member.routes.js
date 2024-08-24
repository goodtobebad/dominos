const controller = require("../controllers/member.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/member", controller.postMember);

  app.post("/member/update/:id", controller.updateMember);

  app.post("/updateScore", controller.updateMembers);
  
  app.delete("/member/:id", controller.deleteMember);

  app.get("/members", controller.getMembers);
};