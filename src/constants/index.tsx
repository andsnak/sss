export interface IFormSchema {
    [key: string]: IFieldSchema
}

export interface IFieldSchema {
    type: string,
    label: string,
    value: string | number,
    required: boolean
}

const BUY_DEV_INS_FORM_SCHEMA : IFormSchema = {
    name: {
        type: "text",
        label: "Name",
        value: '',
        required: true
    },
    surname: {
        type: "text",
        label: "Surname",
        value: '',
        required: true
    },
    email: {
        type: "email",
        label: "Email",
        value: '',
        required: false
    },
    age: {
        type: "number",
        label: "Age",
        value: 0,
        required: false
    },
}

const BUY_DEV_INS_STEP_SCHEMA = [
    ['name', 'surname'],
    ['email'],
    ['age']
];

export enum ProductIds {
    devIns = 'dev_ins'
}

export const PRODUCT_IDS_TO_NAMES = {
    [ProductIds.devIns]: 'Developer Insurance',
}

export const FORM_SCHEMAS = {
    [ProductIds.devIns]: BUY_DEV_INS_FORM_SCHEMA
};

export const STEP_SCHEMAS = {
    [ProductIds.devIns]: BUY_DEV_INS_STEP_SCHEMA
}
