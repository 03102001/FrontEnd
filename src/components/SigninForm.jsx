import React from 'react';
// import SButton from '../../components/Button';
import TextInputWithLabel from './TextInputWithLabel';
import { Form } from 'react-bootstrap';

export default function SForm({ form, handleChange, handleSubmit, isLoading }) {
    return (
        <Form>
            <TextInputWithLabel
                placeholder='Masukan username'
                label='Username'
                name='UserName'
                value={form.UserName}
                type='text'
                required={true}
                onChange={handleChange}
            />
            <TextInputWithLabel
                placeholder='Masukan password'
                label='Password'
                name='UserPassword'
                value={form.UserPassword}
                type='password'
                required={true}
                onChange={handleChange}
            />
            <button type='submit' className='button is-primary' disabled={isLoading} onClick={handleSubmit}>
                {isLoading ? 'Process...' : "Sign In"}
            </button>
        </Form>
    );
}