import React, {useState,useCallback} from 'react';
import {
    ProductIds, 
    PRODUCT_IDS_TO_NAMES, 
    FORM_SCHEMAS, 
    STEP_SCHEMAS, 
    IFormSchema
} from '../constants';
import Stepper from '../components/Stepper'; 
import Field from '../components/Field';

interface BuyflowState {
    [key: string]: string | number 
}

function getInitialState(formSchema : IFormSchema) : BuyflowState {
    const initialState : BuyflowState = {};

    for(let key in formSchema){
        initialState[key] = formSchema[key].initialValue;
    }

    return initialState;
}

const Buyflow : React.FC<{productId: ProductIds}> = ({productId}) => {
    const title = `Buying ${PRODUCT_IDS_TO_NAMES[productId]}`;
    const formSchema = FORM_SCHEMAS[productId];
    const stepSchema = STEP_SCHEMAS[productId];
    
    const [collectedData, updateData] = useState<BuyflowState>(getInitialState(formSchema));

    const handleChange = useCallback((id: string, value: string) => {
        updateData((prev) =>({ ...prev, [id]: value}))
    }, []);

    const validate = (itemIds: string[]) => {
        return !itemIds.some((id : string) => formSchema[id].required && collectedData[id].toString().length === 0);
    }

    return (
        <>
            <h4>{title}</h4>
            <Stepper>
                {stepSchema.map((itemIds, index) => (
                    <Stepper.Step key={`step.${index}`} validation={()=> validate(itemIds)}>
                        {itemIds.map(id => {
                            const {type, label, required} = formSchema[id]; 
                            return <Field 
                                        key={id}
                                        id={id} 
                                        type={type}
                                        label={label} 
                                        required={required}
                                        value={collectedData[id]} 
                                        onChange={handleChange}/>
                        })}
                    </Stepper.Step>    
                ))}
                <Stepper.Step>
                    {Object.entries(formSchema).map(([itemId, schema], index) => (
                        <div key={`${index}.${itemId}`}>{schema.label} : {collectedData[itemId]}</div>
                    ))}
                </Stepper.Step>
            </Stepper>
        </>
    )
}

export default Buyflow;

