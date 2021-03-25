import React, {useState, useMemo, useCallback} from 'react';
import {FORM_SCHEMAS, ProductIds} from '../constants';
import * as SessionStorage from '../helpers/SessionStorage';
import Field from './Field';

interface Props {
    productId: ProductIds,
    fieldIds: string[],
    isActive: boolean,
    onNextClick: (state : State) => void,
}

type State = {
    [key: string]: string | number 
}

const getInitialState = (fields: any[]) : State => {
    return fields.reduce((acc, {id, value}) => ({...acc, [id]: value}), {});
}

const Step : React.FC<Props> = ({productId, fieldIds, isActive, onNextClick}) =>{
    const formSchema = FORM_SCHEMAS[productId];

    const fields = useMemo(() => {
        return fieldIds.map((id) => {
            const storedValue = SessionStorage.getValue(id);
            return {
                ...formSchema[id],
                id,
                value: storedValue !== null && storedValue || formSchema[id].value,
            }
        });
    }, []);

    const [state, setState] = useState<State>(() => getInitialState(fields));
    const [valid, setValid] = useState(true);

    const handleChange = useCallback((id: string, value: string) => {
        setState((prev) => ({ ...prev, [id]: value}));
        SessionStorage.setValue(id, value);
    }, []);

    if(!isActive){
        return null;
    }

    const validate = () => {
        return !fields
            .filter(field => field.required)
            .map(field => field.id)
            .some(id => state[id] === undefined || state[id] === 0 || state[id].toString().length === 0);
    }
 
    const handleNextClick = () => {
        const isValid = validate();
        
        if(isValid){
            onNextClick(state);
        }

        setValid(isValid);
    }

    return (
        <>
            {fieldIds.map((id, index) =>{
                const {type, label, required} = formSchema[id];
                return <Field 
                            key={index}
                            id={id}
                            type={type}
                            label={label}
                            required={required}
                            value={state[id]}
                            onChange={handleChange}
                            />
            })}
            {!valid && <div style={{color:'red'}}>Required fields can't be empty</div>}
            <button onClick={handleNextClick}>Next</button>
        </>
    );
};

export default Step;