import { Router } from "express";

const workflowRouter = Router();

workflowRouter.get("/", (req, res) => {
    res.status(200).json({
        message: "it works",
    })
});

export default workflowRouter; 
