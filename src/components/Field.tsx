import React from 'react';

interface Props {
    id: string,
    type: string,
    label: string,
    value: string | number,
    required: boolean,
    onChange: (id: string, value: any) => void,
}

const Field: React.FC<Props> = ({id, type, label, value, required, onChange}) => {
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
