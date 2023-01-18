// import { parse } from 'path';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';
const score = { v0: 0, v1: 1 };
function riskLevel(testscore) {
  switch (true) {
    case testscore >= 2 && testscore <= 3:
      return `Medium`;
    case testscore >= 4 && testscore <= 5:
      return `High`;
    case testscore >= 0 && testscore <= 1:
      return `Low`;
    default:
      return ``;
  }
}

export const NewAssessment = () => {
  const [ points, setPoints ] = useState(0);

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm();

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const onSubmit = async (data) => {
    await AssessmentService.submit(data);
    const { question1, question2, question3, question4, question5 } = data;
    const scoreTotal = parseInt(question1) +
  parseInt(question2) +
  parseInt(question3) +
  parseInt(question4) +
  parseInt(question5);

    console.log(scoreTotal);
    setPoints(scoreTotal);
    data.score = scoreTotal;
    data.riskLevel = riskLevel(scoreTotal);
    await AssessmentService.submit({ ...data, points });
  };

  // to check onchange response on yes/no
  const value1 = watch(`question1`);
  const value2 = watch(`question2`);
  const value3 = watch(`question3`);
  const value4 = watch(`question4`);
  const value5 = watch(`question5`);
  useEffect(() =>
  {
    const scoreTotal = parseInt(value1) +
      parseInt(value2) +
      parseInt(value3) +
      parseInt(value4) +
      parseInt(value5);
    setPoints(isNaN(scoreTotal) ? 0 : scoreTotal);
  },
  [ value1, value2, value3, value4, value5 ]);

  // declaring constant for Yes and No values as 0 and 1

  return <Form onSubmit={handleSubmit(onSubmit)}>

    <h2><b>Cat Assessment Info</b></h2>

    <br />
    <h3><b>Instrument</b></h3>
    <h2>Cat Behavioral Instrument</h2>
    <h1> User Score: {points} </h1>

    <h4>Cat Details</h4>
    <Form.Group controlId="name">
      <Form.Label>Cat Name</Form.Label>
      <Form.Control
        type="text"
        className="form-control mb-3"
        {...register(`name`)} />
    </Form.Group>

    <Form.Group controlId="dob">
      <Form.Label>Cat Date of Birth</Form.Label>

      <Form.Control
        type="date"
        placeholder="Cat Date of Birth"
        className="form-control mb-3"
        {...register(`date`)} />
    </Form.Group>

    <h4>Questions and responses</h4>
    <Form.Group controlId="question1">
      <Form.Label>1.Previous contact with the Cat Judicial System</Form.Label>
      <Form.Select className="mb-3" {...register(`question1`)}>
        <option value="">Select</option>
        <option value={score.v1}>Yes</option>
        <option value={score.v0}>No</option>
      </Form.Select>
    </Form.Group>

    <Form.Group controlId="question2">
      <Form.Label>2.Physical altercations with other cats</Form.Label>
      <Form.Select className="mb-3" {...register(`question2`)}>
        <option value="">Select</option>
        <option value={score.v0}>0-3 altercations</option>
        <option value={score.v1}>3+ altercations"</option>
      </Form.Select>
    </Form.Group>

    <Form.Group controlId="question3">
      <Form.Label>3.Physical altercations with owner (scratching, biting, etc...)</Form.Label>
      <Form.Select className="mb-3" {...register(`question3`)}>
        <option value="">Select</option>
        <option value={score.v1}>10+ altercations</option>
        <option value={score.v0}>0-10 altercations"</option>
      </Form.Select>
    </Form.Group>

    <Form.Group controlId="question4">
      <Form.Label>4.Plays well with dogs</Form.Label>
      <Form.Select className="mb-3" {...register(`question4`)}>
        <option value="">Select</option>
        <option value={score.v1}>No</option>
        <option value={score.v0}>Yes</option>
      </Form.Select>
    </Form.Group>

    <Form.Group controlId="question5">
      <Form.Label>5.Hisses at strangers</Form.Label>
      <Form.Select className="mb-3" {...register(`question5`)}>
        <option value="">Select</option>
        <option value={score.v1}>Yes</option>
        <option value={score.v0}>No</option>
      </Form.Select>
      <Form.Group> <Form.Label>Risk Level: low[0-1], Medium[2-3], high[4-5]</Form.Label>
      </Form.Group>
    </Form.Group>
    <Button variant="primary" type="submit">Submit</Button>
  </Form>;
};
