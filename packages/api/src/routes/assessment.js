const { AssessmentService } = require(`../microservices`);
const { ResponseHandler } = require(`../utils`);

const { Router } = require(`express`);

const assessmentRouter = Router();

assessmentRouter.post(
  `/submit`,
  async (req, res, next) => {
    try {
      const { assessment } = req.body;

      // verify that your data is making it here to the API by using console.log(assessment);
      global.console.log(assessment);

      // call the AssessmentService.submit function from packages/api/src/microservices/Assessment-Service.js and
      const val = AssessmentService.submit(assessment);
      global.console.log(val);
      // supply the correct parameters

      ResponseHandler(
        res,
        `Submitted assessment`,
        {},
      );
    } catch (err) {
      next(err);
    }
  },
);

assessmentRouter.get(
  `/list`,
  async (req, res, next) => {
    try {
      // verify that your data is making it here to the API by using console.log();
      // call the AssessmentService.getList function from packages/api/src/microservices/Assessment-Service.js
      const data = await AssessmentService.getList();
      ResponseHandler(
        res,
        `Fetched assessments`,
        data,
      );
    } catch (err) {
      next(err);
    }
  },
);

module.exports = { assessmentRouter };
