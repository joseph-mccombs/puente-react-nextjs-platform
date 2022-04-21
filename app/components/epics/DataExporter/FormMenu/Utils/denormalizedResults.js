import { listBucketObjects } from "../../../../../services/awsApiGateway";
import { customQueryService } from "../../../../../modules/cloud-code";


const mapCustomForms = (customFormIds, s3Objects) => {
    const denormalizedCustomForms = [];
    customFormIds.forEach((formId, index) => {
        customQueryService(0, 5000, "FormSpecificationsV2", "objectId", formId).then((customForm) => {
            denormalizedCustomForms.push({
                key: formId,
                value: JSON.parse(JSON.stringify(customForm))[0].name,
                isCustomForm: true, 
                isAssetForm: false,
                s3Key: s3Objects[index].Key
            })
        }, (error) => {
            console.log(error); // eslint-disable-line
        })
    })
    return denormalizedCustomForms
}
const getSetDenormalizedResults = (organization, setMenuItems) => {
    listBucketObjects(`clients/${organization}/data/FormResults/denormalized/`).then((s3Objects) => {
        const customFormIds = s3Objects.map((formResult) => formResult.Key.split("/form-result-")[1].split(".csv")[0])
        setMenuItems(mapCustomForms(customFormIds, s3Objects))
    }, (error) => {
        console.log(error);
    })
}

export {
    getSetDenormalizedResults
};