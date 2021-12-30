import React, { useEffect } from "react";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import retrieveAllFormResults from '../_data';

const PositionedMenu = ({setFormType, formType, formValue, setFormValue, setParams}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [menuItems, setMenuItems] = React.useState([
      {key: 'SurveyData', value:'Survey Data', isCustomForm: false}, 
      {key:'Vitals', value: 'Vitals', isCustomForm: false}, 
      {key: 'Assets', value: 'Assets', isCustomForm: false}, 
      {key:'EvaluationMedical', value: 'Medical Evaluation', isCustomForm: false}, 
      {key:'HistoryEnvironmentalHealth', value: 'History Environmental Health', isCustomForm: false}
    ]);

  const getCustomFormNames = (records) => {
      for (let i = 0; i < records.length; i++){
        let customForm = {}
        customForm = {key: records[i].objectId.toString(), value: records[i].name.toString(), isCustomForm: true};
       // console.log(customForm);
        menuItems.push(customForm);
      }
  }

  const getCustomFormTypes = () => retrieveAllFormResults('FormSpecificationsV2', {
    organizations: "12"
  }).then(records =>  {
    console.log(records)
    getCustomFormNames(records);
    console.log("STUFF: " + menuItems)
  }, (error) => {
    console.log("banana:" + error)
  });

  useEffect(() => {
    getCustomFormTypes();
  }, []);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (menuItem) => {
    if (menuItem.isCustomForm == true){
      setFormType('FormResults')
      setParams({ objectId: menuItem.objectId})
      setFormValue(menuItem.name)
    }
    else if (menuItem.isCustomForm == false){
      setFormType(menuItem.key);
      setFormValue(menuItem.value);
      setParams({ surveyingOrganization: 'Puente'})
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
      >{
          menuItems.map((item)=>(
            
            <MenuItem onClick={(event) => handleClose(item)}>
               {item && (<div>{item.value}</div>)} 
            </MenuItem>
          )
          )}
        

      </Menu>
    </div>
  );
}
export default PositionedMenu;