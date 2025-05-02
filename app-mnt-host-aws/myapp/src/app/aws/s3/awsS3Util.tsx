const { S3Client, PutObjectCommand/*, CreateBucketCommand*/ } = require("@aws-sdk/client-s3");
//import { fromIni } from require("@aws-sdk/credential-providers");
//const fs = require("fs");
const path = require("path");

/*
import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
*/

const uploadFileToS3 = async (
    bucketName: string,
    filePath: string
) => {
    
    try {
        const s3Client = new S3Client({
            endpoint: "http://localhost:4566", // LocalStackのエンドポイント
            region: "us-east-1", // リージョン (LocalStackでは通常は固定)
            credentials: {       // LocalStackでは固定のクレデンシャルを使用可能
                accessKeyId: 'test',
                secretAccessKey: 'test'
            },
            forcePathStyle: true, // LocalStackではパス形式のアクセスが必要
        });

        // バケット作成
        //const bucketName = 'my-new-bucket';
        ///*const createBucketCommand = */new CreateBucketCommand({ Bucket: bucketName });

        // ファイルをアップロード
        // TODO: fsはサーバ側ライブラリのためブラウザ側で利用するとエラー。ここではデタラメな値として億！！
        //const fileContent = fs.readFileSync(filePath);
        const fileContent = "hogegegegegegegegegge.......#$%";
        //const fileName = path.basename(filePath);
        const fileName = "hoge01.txt";

        const uploadParams = {
            Bucket: bucketName,
            Key: fileName, // S3上でのファイル名
            Body: fileContent, // ファイルの内容
        };

        const command = new PutObjectCommand(uploadParams);
        
        const result = await s3Client.send(command);
        console.log("File uploaded successfully:", result);
        return result;
    } catch (error) {
        console.error("Error uploading file:", error);
        alert(error);
        throw error; // エラーをthrowして、呼び出し元で処理できるようにする
    }
}

export {
    s3Client,
    uploadFileToS3,
};
