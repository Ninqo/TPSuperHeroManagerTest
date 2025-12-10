import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [heroes, setHeroes] = useState<any[]>([]);

    useEffect(() => {
        axios.get('/api/heroes').then((res) => setHeroes(res.data));
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h1>Dashboard – Liste des héros</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 15 }}>
                {heroes.slice(0, 20).map((h) => (
                    <div key={h._id} style={{ border: '1px solid #ccc', width: 160, textAlign: 'center' }}>
                        <img src={`http://localhost:5000/uploads/${h.images.xs}`}
                             alt={h.name}
                             style={{ width: 120 }} />
                        <p>{h.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;