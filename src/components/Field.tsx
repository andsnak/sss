import React from 'react';

interface FieldProps {
    id: string,
    type: string,
    label: string,
    value: string | number,
    onChange: Function,
}

const Field: React.FC<FieldProps> = ({type, id, label, value, onChange, ...rest})=>{
    return <div>
        <label htmlFor={id}>{label}</label>
        &#160;
        <span>
            <input 
                type={type} 
                id={id} 
                onChange={({target: {id, value}}) => {onChange(id, value)}} 
                value={value}
                {...rest}
            />
        </span>
    </div>
}

export default Field;