import retrieveAllFormResults from '../../_data';

const PuenteForms = [
  {
    key: 'SurveyData', value: 'Survey Data', isCustomForm: false, isAssetForm: false, s3Key: null,
  },
  {
    key: 'Vitals', value: 'Vitals', isCustomForm: false, isAssetForm: false, s3Key: null,
  },
  {
    key: 'Assets', value: 'Assets', isCustomForm: false, isAssetForm: false, s3Key: null,
  },
  {
    key: 'EvaluationMedical', value: 'Medical Evaluation', isCustomForm: false, isAssetForm: false, s3Key: null,
  },
  {
    key: 'HistoryEnvironmentalHealth', value: 'History Environmental Health', isCustomForm: false, isAssetForm: false, s3Key: null,
  },
];

const getCustomFormNames = (records, menuItems, setMenuItems) => {
  setMenuItems(PuenteForms.concat(records.map((record) => {
    if (record.active !== 'false') {
      if (record.typeOfForm.includes('Assets')) {
        return {
          key: record.objectId.toString(), value: `${record.name.toString()} - Asset`, isCustomForm: true, isAssetForm: true, s3Key: null,
        };
      }
      return {
        key: record.objectId.toString(), value: `${record.name.toString()} - Custom`, isCustomForm: true, isAssetForm: false, s3Key: null,
      };
    }
    return null;
  }).filter((record) => record !== null)));
};

const getCustomFormTypes = (organization, menuItems, setMenuItems) => retrieveAllFormResults('FormSpecificationsV2', {
  organizations: organization,
}).then((records) => {
  getCustomFormNames(records, menuItems, setMenuItems);
}, (error) => {
    console.log(`Error: ${error}`); //eslint-disable-line
});

export { getCustomFormTypes, PuenteForms };
