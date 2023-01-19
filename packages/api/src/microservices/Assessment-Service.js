import { Assessment } from '../database/models';

exports.submit = async (assessment) => {

  await Assessment.create({
    catDateOfBirth: assessment.date,
    catName: assessment.name,
    instrumentType: 1,
    riskLevel: assessment.riskLevel,
    score: assessment.score,

  });

  global.console.log(assessment);
  // use the sequelize model Assessments from packages/api/src/database/models to save
  // the assessment data in the PostgreSQL database
};

exports.getList = () => {
  // use the sequelize model Assessments from packages/api/src/database/models to fetch
  // the assessment data from the PostgreSQL database
  const assessments = [];

  return assessments;
};
