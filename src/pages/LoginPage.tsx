import { useState, FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handle = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await login(username, password);
            window.location.href = '/dashboard';
        } catch {
            alert('Identifiants invalides');
        }
    };

    return (
        <div style={{ maxWidth: 320, margin: 'auto', marginTop: 100 }}>
            <h2>Connexion</h2>
            <form onSubmit={handle}>
                <input
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                /><br />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default LoginPage;