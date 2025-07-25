import boto3

cloudwatch = boto3.client('cloudwatch')
ec2 = boto3.client('ec2')

response = cloudwatch.get_metric_statistics(
    Namespace='AWS/EC2', MetricName='CPUUtilization',
    Dimensions=[{'Name': 'InstanceId', 'Value': 'i-0abc123def456'}],
    StartTime=datetime.datetime.utcnow() - datetime.timedelta(minutes=10),
    EndTime=datetime.datetime.utcnow(), Period=300, Statistics=['Average']
)

avg_cpu = response['Datapoints'][0]['Average']
if avg_cpu > 75:
    print("High CPU! Launching one more EC2...")
    ec2.run_instances(ImageId='ami-xyz', InstanceType='t2.micro', MinCount=1, MaxCount=1)
else:
    print("CPU normal. No scaling needed.")
