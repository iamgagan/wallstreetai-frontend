import { Upload } from "@aws-sdk/lib-storage";
import { S3 } from "@aws-sdk/client-s3";
import { Resume } from "@/types/Resume";
import { Error } from "@/types/Error";

export class FileUpload {

    public async uploadAws(userId:string, resume:File, resumeFileId?:string) {
        try {

            if(!userId){
                const error:Error = {
                    statusCode: 400,
                    errorCode: "Bad Request",
                    message: "Required data missing",
                    data: "userId missing"
                }
                return error;
            }

            if(!resume){
                const error:Error = {
                    statusCode: 400,
                    errorCode: "Bad Request",
                    message: "Required data missing",
                    data: "resume missing"
                }
                return error;
            }

            if(!resumeFileId){
                const error:Error = {
                    statusCode: 400,
                    errorCode: "Bad Request",
                    message: "Required data missing",
                    data: "resumeFileId missing"
                }
                return error;
            }

            console.log("this is resumeFileId",resumeFileId);
            console.log("this is userId",userId);
            console.log("this is resume",resume);

            // upload resume to s3
            const upload : any = await new Upload({
                client: new S3({
                  region : process.env.AWS_REGION,
                  credentials : {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
                    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET as string,   
                  }
                }),
    
                params: {
                  Bucket      : process.env.AWS_S3_BUCKET,
                  Key         :  + "_" + resumeFileId,
                  Body        : resume,
                  ContentType : 'stream',
                }
            }).done();

            console.log("this is upload",upload);

            if(!upload.Location){
                const error:Error = {
                    statusCode:500,
                    errorCode: "Internal Server Error",
                    message: "Something went wrong",
                    data: "AWS S3 resume upload not successful"
                }
            }

            const awsUrl : string = upload.Location;
            return {awsUrl: awsUrl};
        } catch (error) {
            return error;
        }

    }
}   