import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useEffect, useState } from 'react';
import { PuenteForms, getCustomFormTypes, getSetDenormalizedResults } from "./Utils"
import CircularProgress from '@material-ui/core/CircularProgress';

const FormMenu = ({
  setFormType, formType, formValue, setFormValue, setParams, organization, setCsvData, denormalized, setS3Url
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!denormalized) {
      getCustomFormTypes(organization, menuItems, setMenuItems);
    } else {
      getSetDenormalizedResults(organization, setMenuItems)
    }
  }, [organization, denormalized]);

  useEffect(() => {
    setLoading(false);
    console.log("MENU ITEMSSSSS",menuItems)
  }, [menuItems])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (menuItem) => {
    if (menuItem.isCustomForm === true) {
      if (menuItem.isAssetForm === true) {
        setFormType('FormAssetResults');
      } else {
        setFormType('FormResults');
      }
      setFormValue(menuItem.value);
      setParams({ formSpecificationsId: menuItem.key, surveyingOrganization: organization });
      setS3Url(menuItem.s3Key)
    } else if (menuItem.isCustomForm === false) {
      setFormType(menuItem.key);
      setFormValue(menuItem.value);
      setParams({ surveyingOrganization: organization });
      setS3Url(menuItem.s3Key)
    }
    setCsvData([]);
    setAnchorEl(null);
  };

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
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
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {menuItems.length > 0 && menuItems.map((item) => (

          <MenuItem
            onClick={() => handleClose(item)}
            key={`${item.key}-${item.value}`}
          >
            {item && (<div>{item.value}</div>)}
          </MenuItem>
        ))}
      </Menu>
      </div>
      )}
    </div>
  );
};
export default FormMenu;
