import { useState } from 'react';
import { supabase } from '../supabaseClient';
import './CreateAccount.css';

export default function CreateAccount() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            console.error(error);
        } else {
            console.log(data);
        }
    };

    return (
        <form className='create-account-form'>
            <h2 className='create-account-form__title'>Create Account</h2>
            <div className='create-account-form__input-group'>
                <label className='create-account-form__label' htmlFor='email'>Email:</label>
                <input className='create-account-form__input' type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='create-account-form__input-group'>
                <label className='create-account-form__label' htmlFor='password'>Password:</label>
                <input className='create-account-form__input' type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className='create-account-form__submit-button' type='submit' onClick={handleCreateAccount}>Create Account</button>
            <p className='create-account-form__error'></p>
            <p className='create-account-form__login-link'>Already have an account? <a href='/login'>Log in</a></p>
        </form>
    );
}