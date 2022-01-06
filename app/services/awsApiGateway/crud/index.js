import https from 'https'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

function retrieveCleanedData(specifier, customFormId, surveyingOrganization) {
    return new Promise((resolve, reject) => {
        const data = {
            specifier: specifier,
            surveyingOrganization: 'Puente'
        }

        if (customFormId !== undefined) {
            data['customFormId'] = customFormId
        }

        const urlSearchParams= "?" + new URLSearchParams(data);

        const options = {
            method: 'POST',
            hostname: process.env.NEXT_PUBLIC_awsApiGatewayHost,
            path: process.env.NEXT_PUBLIC_awsApiGatewayPath + urlSearchParams.toString(),
            headers: {}
        }

        console.log(process.env.NEXT_PUBLIC_awsApiGateway)

        var req = https.request(options, function (res) {
            var chunks = [];
          
            res.on("data", function (chunk) {
              chunks.push(chunk);
            });
          
            res.on("end", function (chunk) {
              var body = Buffer.concat(chunks);
              resolve(JSON.parse(body.toString()));
            });
          
            res.on("error", function (error) {
              reject(error);
            });
          }, (error) => {
              reject(error)
          });
          
          req.end();

    })
}

function getDataFromS3(key) {
    return new Promise(async (resolve, reject) => {
        const s3Client = new S3Client({'region': 'us-east-1', 'credentials': {
            accessKeyId: process.env.NEXT_PUBLIC_awsAccessKeyId,
            secretAccessKey: process.env.NEXT_PUBLIC_awsSecretAccessKey
        }})
        const objectKey = key.split(process.env.NEXT_PUBLIC_s3Bucket + '/')[1]

        const getObjectCommand = new GetObjectCommand({ 'Bucket' :process.env.NEXT_PUBLIC_s3Bucket, 'Key': objectKey})
        console.log("Starting to download data")

        await s3Client.send(getObjectCommand)
        // code for readStream from mozilla: https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
        .then((data) => data.Body)
        .then((dataBody) => {
            const reader = dataBody.getReader();

            return new ReadableStream({
              start(controller) {
                // The following function handles each data chunk
                function push() {
                  // "done" is a Boolean and value a "Uint8Array"
                  reader.read().then( ({done, value}) => {
                    // If there is no more data to read
                    if (done) {
                      console.log('done', done);
                      controller.close();
                      return;
                    }
                    // Get the data and send it to the browser via the controller
                    controller.enqueue(value);
                    // Check chunks by logging to the console
                    console.log(done, value);
                    push();
                  })
                }
          
                push();
              }
            });
        })
        .then((stream) => {
            // Respond with our stream
            return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
          })
        .then((result) => {
            // Do things with result
            console.log(result);
            resolve(result)
        }, (error) => {
            reject(error)
        })

    })
}

export {
    retrieveCleanedData, getDataFromS3
}