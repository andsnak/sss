import React, {useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Flow from '../components/Flow';
import Field from '../components/Field';

export enum ProductIds {
    devIns = 'dev_ins'
}

const PRODUCT_IDS_TO_NAMES = {
    [ProductIds.devIns]: 'Developer Insurance',
}

const Buyflow: React.FC<{
    productId: ProductIds,
}> = (props) => {
    const [collectedData, updateData] = useState({
        'name': '',
        'surname': '',
        'email': '',
        'age': 0,
    });

    const handleChange = (field: string, value: any) => updateData({ ...collectedData, [field]: value });
    const validatePersonal = useCallback(()=> name.length !== 0 && surname.length, [collectedData.name, collectedData.surname]);
    const {name, surname, email, age} = collectedData;
    
    return (
        <Flow title={`Buying ${PRODUCT_IDS_TO_NAMES[props.productId]}`}>
                <Flow.Step index={0} validate={validatePersonal}>
                <Field id={'name'} label={"Name"} type="text" onChange={handleChange} value={name}/>
                <Field id={'surname'} label={"Surname"} type="text" onChange={handleChange} value={surname}/>
            </Flow.Step>
            <Flow.Step index={1}>
                <Field id={'email'} label={"Email"} type="email" onChange={handleChange} value={email}/>
            </Flow.Step>
            <Flow.Step index={2}>
                <Field id={'age'} label={"Age"} type="number" onChange={handleChange} value={age}/>                
            </Flow.Step>
            <Flow.Step index={3} isLastStep>
                <div>Personal: {name} {surname}</div>
                <div>Email: {email}</div>
                <div>Age: {age}</div>
                <div><Link to='/purchased=dev_ins'>Purchase</Link></div>
            </Flow.Step>
        </Flow>
    )
}

export default Buyflow;

