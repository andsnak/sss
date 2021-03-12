import React, { useState } from 'react';

interface PersonalStepProps {
    cb: (field: string, value: string) => void,
}

const PersonalStep: React.FC<PersonalStepProps> = (props) => {
    const [valid, setValid] = useState(true);
    const [personal, setPersonal] = useState({ name: '', surname: '' })

    const handleNext = () => {
        const {name, surname} = personal;
        const isValid = name.length !== 0 && surname.length !== 0;

        if (isValid) {
            props.cb('personal', `${name} ${surname}`)
        }

        setValid(isValid);
    }

    const handleChange = ({ target: { value, id } } : {target: {value: string, id: string}}) => {
        setPersonal({ ...personal, [id]: value });
        setValid(true); 
    }

    return <>
        <div>Name: <input type='text' id="name" onChange={handleChange} value={personal.name} /></div>
        <div>Surname: <input type='text' id="surname" onChange={handleChange} value={personal.surname} /></div>
        {!valid && <div style={{ color: 'red' }}>Name or surname is empty.</div>}
        <button onClick={handleNext}>Next</button>
    </>;
};

export default PersonalStep;