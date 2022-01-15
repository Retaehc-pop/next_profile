import { Client, Entity, Schema, Repository} from 'redis-om'

const client = new Client();

async function connect(){
    if (!client.isOpen()){
        await client.open(process.env.REDIS_URL);
    }
}

class Project extends Entity{}
let schema = new Schema(
    Project,{
        name:{ type:'string'},
        date:{ type:'string'},
        role:{ type:'string'},
        description:{ type:'string'},
        source:{ type:'string'},
        type:{type:'string'},
        organisation:{type:'string'},
    },
    {
        dataStructure: 'JSON'
    }
);

export async function createProject(data){
    await connect();

    const repository = new Repository(schema, client);

    const project =  repository.createEntity(data);

    const id = await repository.save(project);

    return id;
}

export async function getProject(id) {
    await connect();
  
    const repository = new Repository(schema, client);
    return repository.fetch(id);
  }

export async function createIndex(){
    await connect();

    const repository = new Repository(schema, client);
    await repository.createIndex()
}

export async function searchProjects(q){
    await connect();
    const repository = new Repository(schema, client);

    const projects = await repository.search()
    .where("name").eq(q).return.all();
    return projects;
}