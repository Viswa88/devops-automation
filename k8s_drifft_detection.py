import subprocess
import difflib

namespace = "default"
resource = "deployment/myapp"

# Get live K8s YAML
live_yaml = subprocess.getoutput(f"kubectl get {resource} -n {namespace} -o yaml")

# Get Git YAML
with open("myapp-deployment.yaml") as f:
    git_yaml = f.read()

# Compare
diff = difflib.unified_diff(git_yaml.splitlines(), live_yaml.splitlines())
changes = list(diff)
if changes:
    print("Drift detected. Re-applying desired config...")
    subprocess.run(f"kubectl apply -f myapp-deployment.yaml", shell=True)
else:
    print("No drift detected.")
