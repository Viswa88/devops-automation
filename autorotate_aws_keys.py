import boto3
import datetime

accounts = ['123456789012', '987654321098']
for account in accounts:
    session = boto3.Session(profile_name=f'{account}-admin')
    iam = session.client('iam')
    users = iam.list_users()['Users']

    for user in users:
        keys = iam.list_access_keys(UserName=user['UserName'])['AccessKeyMetadata']
        for key in keys:
            age = (datetime.datetime.now(datetime.timezone.utc) - key['CreateDate']).days
            if age > 85:
                print(f"Rotating key for {user['UserName']} in {account}")
                iam.create_access_key(UserName=user['UserName'])
                iam.delete_access_key(UserName=user['UserName'], AccessKeyId=key['AccessKeyId'])
