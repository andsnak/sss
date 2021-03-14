import React, {ReactElement, useState} from 'react';

interface StepProps {
    children: ReactElement[],
    validation?: () => boolean
}

const Step : React.FC<StepProps> = ({children}) =>(<>{children}</>);

const Stepper : React.FC & {Step: typeof Step} = ({ children }) => {
    const childrenArray = React.Children.toArray(children) as React.ReactElement<StepProps>[];
    const [step, setStep] = useState(0);
    const [valid, setValid] = useState(true);
    const currentChild = childrenArray[step];
  
    function isLastStep() {
      return step === childrenArray.length - 1;
    } 

    const handleClick = ()=>{
        let isValid = true;

        if(currentChild.props.validation){
            isValid = currentChild.props.validation();
        }

        if(isValid){
            setStep(step + 1);
        } 

        setValid(isValid);
    };

    return <>
        {currentChild}
        {!valid && <div style={{color:'red'}}>Required fields can't be empty</div>}
        {!isLastStep() && <button onClick={handleClick}>Next</button>}
    </>
}

Stepper.Step = Step;

export default Stepper;