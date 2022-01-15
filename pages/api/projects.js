import { createProject } from "../../lib/redis";

export default async function handler(req,res){
    const id = await createProject(req.body);
    res.status(200).json({id})
}
