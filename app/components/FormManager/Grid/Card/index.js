import styles from './index.module.scss';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import { useState } from 'react';
import {
    Button,
    Menu,
    Grid,
    CircularProgress, MenuItem,
    Select,
  } from '@material-ui/core';
  import Modal from 'app/components/UI/Modal';
  import WorkflowModal from './Modal';
  import { removeQueryService, updateObject } from 'app/services/parse';



const Card = ({ 
    row, retrieveCustomData,
    passDataToFormCreator, organization, workflows
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = useState(false);
    const [workflowModalOpen, setWorkflowModalOpen] = useState(false);
    const [selectedForm, setSelectedForm] = useState();

    const handleDuplicate = (object) => {
        passDataToFormCreator(object);
    };

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleModal = (row) => {
        setOpen(!open);
        setSelectedForm(row);
    };

    const handleRemove = () => {
        removeQueryService('FormSpecificationsV2', selectedForm.objectId);
        retrieveCustomData(organization);
        setOpen(!open);
    };

    const handleWorkflow = (row, workflow) => {
        const params = {
            parseClass: 'FormSpecificationsV2',
            parseClassID: row.objectId,
            localObject: {
                workflows: row.workflows.concat([workflow])
            }
        }
        updateObject(params);
    }

    const handleWorkflowModal = () => {
        setWorkflowModalOpen(!open)
    }
  return (
    <div className={styles.card}>
        <Modal
            open={open}
            handleClose={() => setOpen(!open)}
            text="Do you want to remove this Form"
            action={handleRemove}
            actionText="Remove"
        />
        <WorkflowModal
            open={workflowModalOpen}
            handleClose={() => setWorkflowModalOpen(!workflowModalOpen)}
            // text="Do you want to remove this Form"
            // action={handleRemove}
            // actionText="Remove"
            handleWorkflow={handleWorkflow}
            row={row}
            workflows={workflows}
        />

        <FolderOpenOutlinedIcon 
            fontSize='large'
        />
        <Button style={{marginLeft: 'auto'}}onClick={handleClick}>
            Options
        </Button>
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={(handleClose)}
        >
            <MenuItem onClick={() => handleDuplicate(row)}>Duplicate</MenuItem>
            <MenuItem onClick={() => handleModal(row)}>Remove</MenuItem>
            <MenuItem onClick={() => handleWorkflowModal()}>Add Workflow</MenuItem>
        </Menu>
        <hr></hr>
        <p>{row.name}</p>
        <p>{row.description}</p>
    </div>
  )
};

export default Card;
