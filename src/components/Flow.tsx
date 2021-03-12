import React, { useState, useContext, ReactNodeArray } from 'react';

const StepsContext = React.createContext<[number, Function]>([0, ()=>{}]);

function useStepsContext() {
  const context = useContext(StepsContext)
  if (!context) {
    throw new Error('useStepsContext must be used within a Steps Component');
  }
  return context;
}

const Step: React.FC<{
    index: number,
    isLastStep?: boolean,
    validate?: Function,
}> = ({children, index, validate, isLastStep = false}) => {
    const [step, setStep] = useStepsContext();
    const [valid, setValid] = useState(true);

    if(index !== step){
        return null;
    }

    if(isLastStep){
        return <>{children}</>;
    }

    const handleNextClick = ()=>{
        let isValid = true;
        if(validate){
            isValid = validate();
        }

        setValid(isValid);

        if(isValid){
            setStep(step + 1);
        }
    }

    return <>
        {children}
        {!valid && <div style={{color: 'red'}}> Some field are empty</div>}
        <button onClick={handleNextClick}>Next</button>
    </>
}

const Flow:React.FC<{title: string, children:ReactNodeArray}> & {Step: typeof Step}= ({title, children}) => {
    const [step, setStep] = useState(0);
    
    if(step === children.length){
        setStep(0);
    }

    return <StepsContext.Provider value={[step, setStep]}>
        <h4>{title}</h4>
        {children}
    </StepsContext.Provider>
}

Flow.Step = Step; 

export default Flow;