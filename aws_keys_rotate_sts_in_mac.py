# AWS Key Updater and EKS Config Script (MacOS)
# Description: List AWS profiles and EKS clusters, get latest access keys, update ~/.aws/credentials, and update kubeconfig

import boto3
import os
import sys
import configparser
import subprocess

# === List available AWS profiles ===
session = boto3.Session()
available_profiles = session.available_profiles
print("\nAvailable AWS Profiles:")
for idx, profile in enumerate(available_profiles):
    print(f"{idx + 1}. {profile}")

# === Select Profile ===
profile_choice = int(input("\nSelect AWS Profile (number): ")) - 1
if profile_choice not in range(len(available_profiles)):
    print("Invalid choice. Exiting.")
    sys.exit(1)
profile_name = available_profiles[profile_choice]

# === Get AWS Session for selected profile ===
session = boto3.Session(profile_name=profile_name)
iam = session.client('iam')

# === Fetch Latest Access Key ===
user = session.client('sts').get_caller_identity()['Arn'].split('/')[-1]
keys = iam.list_access_keys(UserName=user)['AccessKeyMetadata']
keys.sort(key=lambda k: k['CreateDate'], reverse=True)
latest_key = keys[0]

# === Create New Access Key ===
new_key = iam.create_access_key(UserName=user)['AccessKey']

# === Update ~/.aws/credentials ===
cred_file = os.path.expanduser('~/.aws/credentials')
config = configparser.ConfigParser()
config.read(cred_file)

if profile_name not in config:
    config.add_section(profile_name)

config[profile_name]['aws_access_key_id'] = new_key['AccessKeyId']
config[profile_name]['aws_secret_access_key'] = new_key['SecretAccessKey']

with open(cred_file, 'w') as configfile:
    config.write(configfile)

print(f"✅ Updated AWS credentials for profile: {profile_name}")

# === List EKS Clusters ===
eks = session.client('eks')
clusters = eks.list_clusters()['clusters']
print("\nAvailable EKS Clusters:")
for idx, cluster in enumerate(clusters):
    print(f"{idx + 1}. {cluster}")

# === Select Cluster ===
cluster_choice = int(input("\nSelect EKS Cluster (number): ")) - 1
if cluster_choice not in range(len(clusters)):
    print("Invalid choice. Exiting.")
    sys.exit(1)
cluster_name = clusters[cluster_choice]
region = session.region_name

# === Update kubeconfig for EKS ===
cmd = f"aws eks update-kubeconfig --name {cluster_name} --region {region} --profile {profile_name}"

try:
    subprocess.run(cmd, shell=True, check=True)
    print("✅ EKS kubeconfig updated.")
except subprocess.CalledProcessError as e:
    print("❌ Error updating kubeconfig:", e)
