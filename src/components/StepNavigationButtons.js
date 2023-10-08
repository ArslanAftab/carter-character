import { Button } from "@mantine/core";

function StepNavigationButtons({ step, onPrev, onNext, isLastStep }) {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
        {step > 0 && (
          <Button onClick={onPrev}>
            Back
          </Button>
        )}
        <Button onClick={onNext} color="blue">
          {isLastStep ? 'Submit' : 'Next'}
        </Button>
      </div>
    );
  }
  
  export default StepNavigationButtons;
