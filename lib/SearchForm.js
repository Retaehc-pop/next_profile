import { useState } from "react";
import styles from '../styles/Home.module.css'

export default function SearchForm() {
    const [hits,setHits] = useState([]);
    const style = {
        display:"flex",
        padding:"1rem",
    }
    const search = async (event) => {
        const q = event.target.value;

        if (q.length > 2){
            const params = new URLSearchParams({ q })
            const res = await fetch('/api/search?' + params)
            const result = await res.json();
            console.log(result);
            setHits(result['Projects']);
        }
    }
    return <div style={style}>
        <input type="text" className={styles.searchbox} onChange={search}/>
        <ul>
            {hits.map((hit)=>(
                <li key={hit.entityId}>
                    {hit.name}{hit.date}{hit.role}
                </li>
            ))}
        </ul>
    </div>
}