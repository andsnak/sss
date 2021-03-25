import React, {useState} from 'react';
import { useHistory, useLocation } from "react-router-dom";
import {ProductIds, PRODUCT_IDS_TO_NAMES, STEP_SCHEMAS} from '../constants';
import Step from '../components/Step'; 
import LastStep from '../components/LastStep';

type State = {
    [key: string]: string | number 
}

const useHistoryStepper = ()  => {
    const { state = { currentStep: 0 }, ...location } : {state: {currentStep: number}} = useLocation();
    const history = useHistory();

    const setNextStep : () => void = () => {
        history.push({
            ...location,
            state: {currentStep: state.currentStep + 1}
          });
    }

    return {currentStep: state.currentStep, setNextStep};
}

const Buyflow : React.FC<{productId: ProductIds}> = ({productId}) => {
    const title = `Buying ${PRODUCT_IDS_TO_NAMES[productId]}`;
    const stepsSchema = STEP_SCHEMAS[productId];

    const [collectedData, updateData] = useState<State>({});
    const {currentStep, setNextStep} = useHistoryStepper();
    
    const isLastStep = () => currentStep === stepsSchema.length;

    const handleNextStep = (next: State) => {
        updateData((prev) =>({ ...prev, ...next}));
        setNextStep();
    };

    return (
        <>
            <h4>{title}</h4>
            {!isLastStep() ? 
                stepsSchema.map((fieldIds, index) => 
                    <Step 
                        key={index}
                        productId={productId} 
                        isActive={currentStep === index}
                        fieldIds={fieldIds} 
                        onNextClick={handleNextStep}
                        />) :
                    <LastStep 
                            productId={productId} 
                            fieldIds={stepsSchema.flat()} 
                            values={collectedData}/>
                    }
        </>
    )
}

export default Buyflow;

