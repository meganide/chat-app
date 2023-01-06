import express from "express";
const membersRouter = express.Router();
membersRouter.get('/members');
export { membersRouter };
