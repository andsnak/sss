import React from 'react';

interface FieldProps {
    id: string,
    type: string,
    label: string,
    value: string | number,
    required: boolean,
    onChange: Function,
}

const Field: React.FC<FieldProps> = ({id, type, label, value, required, onChange}) => {
    return (
        <div key={id}>
            <label htmlFor={id}>{label}{required && '*'}</label>
            &#160;
            <span>
                <input id={id} type={type} onChange={e => onChange(id, e.target.value)} value={value}/>
            </span>
        </div>
    )
}

export default React.memo(Field);
