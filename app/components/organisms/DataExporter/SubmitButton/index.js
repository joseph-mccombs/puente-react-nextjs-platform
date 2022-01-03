import React, { useEffect } from "react";
import Button from '@material-ui/core/Button'


const SubmitButton = ({
    handleSubmit
}) => {

    const handleClick = (event) => {
        handleSubmit();
    }

    return(
        <Button 
            variant="contained"
            onClick={(event) => handleClick()}
        >
            Submit
        </Button>
    );
};

export default SubmitButton;