import { searchProjects } from "../../lib/redis";

export default async function handler(req,res){
    const q = req.query.q;
    const projects = await searchProjects(q);
    res.status(200).json({ projects });

}