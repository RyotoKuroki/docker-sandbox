

■S3作成失敗
aws s3 mb s3://sample-buck-01 --endpoint-url=http://localhost:4566
#aws --profile localstack s3 mb s3://sample-buck-01 --endpoint-url=http://localhost:4566
　↓
Error
　→make_bucket failed: s3://s3-buck-01 Unable to locate credentials





■認証情報など確認
$ aws configure list
--------------------------------------------------------------------
      Name                    Value             Type    Location
      ----                    -----             ----    --------
   profile                <not set>             None    None
access_key                <not set>             None    None
secret_key                <not set>             None    None
    region                <not set>             None    None
--------------------------------------------------------------------

　↓access_key, secure_key の設定

$ aws configure
	AWS Access Key ID [None]: test
	AWS Secret Access Key [None]: test
	Default region name [None]: us-east-1
	Default output format [None]: json

　↓再確認

$ aws configure list
--------------------------------------------------------------------
      Name                    Value             Type    Location
      ----                    -----             ----    --------
   profile                <not set>             None    None
access_key     ****************test shared-credentials-file
secret_key     ****************test shared-credentials-file
    region                us-east-1      config-file    ~/.aws/config
--------------------------------------------------------------------

　↓S3にバケット作成

$ aws s3 mb s3://sample-buck-01 --endpoint-url=http://localhost:4566
make_bucket: sample-buck-01

　↓バケット確認

$ aws s3 ls --endpoint-url=http://localhost:4566

　↓ファイルアップロード

$ aws s3 cp up.log s3://sample-buck-01/ --endpoint-url=http://localhost:4566

　↓オブジェクト確認

$ aws s3 ls s3://sample-buck-01 --endpoint-url=http://localhost:4566
又は
http://localhost:4566/sample-buck-01


　↓オブジェクト削除

aws s3 rm s3://sample-buck-01/up.log --endpoint-url=http://localhost:4566


