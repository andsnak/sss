import React, {useEffect} from 'react';
import * as SessionStorage from '../helpers/SessionStorage';
import {FORM_SCHEMAS, ProductIds} from '../constants';

interface LastStepProps {
    productId: ProductIds, 
    fieldIds: string[], 
    values: {
        [key: string]: number | string
    }
}

const LastStep : React.FC<LastStepProps> = ({productId, fieldIds, values})=>{
    const formSchema = FORM_SCHEMAS[productId];
    
    useEffect(() => {
        return () => fieldIds.forEach(fieldId => SessionStorage.clearValue(fieldId))
    },[]);

    return (
        <>
            {fieldIds.map((fieldId) => (
                    <div key={fieldId}>{formSchema[fieldId].label} : {values[fieldId]}</div>
                ))}
        </>
    );
}

export default LastStep;