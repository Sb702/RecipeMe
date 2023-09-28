import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function CreateAccount() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            console.error(error);
        } else {
            console.log(user);
        }
    };

    return (
        <form onSubmit={handleCreateAccount}>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Create Account</button>
        </form>
    );
}