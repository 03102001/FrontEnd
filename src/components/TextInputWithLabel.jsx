import React from 'react'

const TextInputWithLabel = ({ id, type, label, value, placeholder, required, onChange, name }) => {
    return (
        <div className='field'>
            <label className='label' htmlFor={id} key={Math.random() * 100}>{label}</label>
            <div className="control">
                <input className='input' required={required} type={type} id={id} name={name} placeholder={placeholder} value={value} onChange={onChange} />
            </div>
        </div>
    )
}

export default TextInputWithLabel