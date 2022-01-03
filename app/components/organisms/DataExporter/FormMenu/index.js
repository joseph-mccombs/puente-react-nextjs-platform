import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import retrieveAllFormResults from '../_data';

const FormMenu = ({
  setFormType, formType, formValue, setFormValue, setParams, organization
}) => {
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [menuItems, setMenuItems] = useState([
      {key: 'SurveyData', value:'Survey Data', isCustomForm: false}, 
      {key:'Vitals', value: 'Vitals', isCustomForm: false}, 
      {key: 'Assets', value: 'Assets', isCustomForm: false}, 
      {key:'EvaluationMedical', value: 'Medical Evaluation', isCustomForm: false}, 
      {key:'HistoryEnvironmentalHealth', value: 'History Environmental Health', isCustomForm: false},
    ]);

  const getCustomFormNames = (records) => {
      records.forEach((record) => {
        console.log("record:", record)
        let customForm = {}
        let tempMenuItems = menuItems
        customForm = {key: record.objectId.toString(), value: record.name.toString(), isCustomForm: true};
        tempMenuItems.push(customForm)
        setMenuItems(tempMenuItems)
      })
  }

  const getCustomFormTypes = () => retrieveAllFormResults('FormSpecificationsV2', {
    organizations: organization
  }).then(records =>  {
    console.log(records)
    getCustomFormNames(records);
    console.log("STUFF: " + menuItems)
  }, (error) => {
    console.log("banana:" + error)
  });

  useEffect(() => {
    getCustomFormTypes();
  }, [organization]);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (menuItem) => {
    if (menuItem.isCustomForm == true){
      setFormType('FormResults')
      setFormValue(menuItem.value)
      setParams({ formSpecificationsId: menuItem.key, surveyingOrganization: organization})
    }
    else if (menuItem.isCustomForm == false){
      setFormType(menuItem.key);
      setFormValue(menuItem.value);
      setParams({ surveyingOrganization: organization})
    }
    setAnchorEl(null);
  };

  return (
    <div>
    
      <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <div>{formType && (<div>{formValue}</div>)}</div>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {menuItems.length > 0 && menuItems.map((item)=> (
            
            <MenuItem 
              onClick={(event) => handleClose(item)}
              key={item.key}
              >
               {item && (<div>{item.value}</div>)} 
            </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
export default FormMenu;