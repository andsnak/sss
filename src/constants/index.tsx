export interface IFormSchema {
    [key: string]: {
        type: string,
        label: string,
        initialValue: string | number,
        required: boolean
    }
}

const BUY_DEV_INS_FORM_SCHEMA : IFormSchema = {
    name: {
        type: "text",
        label: "Name",
        initialValue: '',
        required: true
    },
    surname: {
        type: "text",
        label: "Surname",
        initialValue: '',
        required: true
    },
    email: {
        type: "email",
        label: "Email",
        initialValue: '',
        required: false
    },
    age: {
        type: "number",
        label: "Age",
        initialValue: 0,
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
