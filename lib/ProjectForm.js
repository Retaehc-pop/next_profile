export default function ProjectForm() {

    const handleSubmit = async (event) =>{ 
        event.preventDefault();

        const form = new FormData(event.target);
        const formData = Object.fromEntries(form.entries());
        console.log(formData);

        const res = await fetch('/api/projects',{
            body: JSON.stringify(formData),
            headers:{
                'content-Type':'application/json',
            },
            method:'POST',
        });

        const result = await res.json();
        console.log(result)
    } 
    return <form onSubmit={handleSubmit}>
        <h2>Name</h2>
        <input name="name" type="text"/>
        <h2>Date</h2>
        <input name="date" type="text"/>
        <h2>Role</h2>
        <input name="role" type="text"/>
        <h2>description</h2>
        <input name="description" type="text"/>
        <h2>Source</h2>
        <input name="source" type="text"/>
        <h2>Type</h2>
        <input name="type" type="text"/>
        <h2>Organisation</h2>
        <input name="Organisation" type="text"/>
        <h2></h2>
        <button type="submit">Create Project</button>
        </form>
}