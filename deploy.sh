npm run build && aws s3 sync ./dist s3://apiv2.corona-live.com
npm run build && aws s3 sync ./dist s3://test.corona-live.com 
npm run build && aws s3 sync ./dist s3://corona-live.com 

