import { customQueryService } from 'app/services/parse';

const retrieveCustomData = async (organization) => {
  try {
    const records = await customQueryService(0, 5000, 'FormSpecificationsV2', 'organizations', organization);
    const parsedRecords = JSON.parse(JSON.stringify(records));
    return parsedRecords;
  } catch (e) {
    return e;
  }
};

export default retrieveCustomData;
