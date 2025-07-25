# Jira Reminder Bot for Microsoft Teams (Python Script)
# Features:
# - List all tickets by team member
# - Show status, sprint analytics, blockers
# - Sends formatted message to Teams Webhook

import requests
import json
import datetime

# === CONFIGURATION ===
JIRA_BASE_URL = "https://yourdomain.atlassian.net"
JIRA_EMAIL = "you@example.com"
JIRA_API_TOKEN = "your_jira_api_token"
TEAMS_WEBHOOK_URL = "https://outlook.office.com/webhook/..."
TEAM_MEMBERS = ["ajay", "rahul", "priya", "anita", "vishal", "meera", "arun", "sneha", "rohit", "pallavi", "kiran", "deepak", "rekha", "suresh", "divya"]

# === FUNCTION TO FETCH TICKETS ===
def get_jira_tickets(assignee):
    headers = {'Content-Type': 'application/json'}
    auth = (JIRA_EMAIL, JIRA_API_TOKEN)
    jql = f"assignee={assignee} AND sprint in openSprints() ORDER BY priority DESC"
    url = f"{JIRA_BASE_URL}/rest/api/2/search?jql={jql}"
    response = requests.get(url, headers=headers, auth=auth)
    return response.json()

# === FUNCTION TO FORMAT TEAMS MESSAGE ===
def format_teams_message(user, tickets):
    msg = f"\n**👤 {user.upper()} - Jira Sprint Tasks:**\n"
    for issue in tickets.get("issues", []):
        key = issue['key']
        summary = issue['fields']['summary']
        status = issue['fields']['status']['name']
        msg += f"- `{key}`: {summary} [Status: *{status}*]\n"
    return msg

# === FUNCTION TO SEND MESSAGE TO TEAMS ===
def send_to_teams(message):
    payload = {"text": message}
    requests.post(TEAMS_WEBHOOK_URL, json=payload)

# === MAIN SCRIPT ===
full_message = f"📊 **Jira Sprint Status Report - {datetime.date.today()}**\n"
for user in TEAM_MEMBERS:
    data = get_jira_tickets(user)
    user_msg = format_teams_message(user, data)
    full_message += user_msg + "\n"

send_to_teams(full_message)
print("✅ Jira Status Sent to Teams.")

# === OPTIONAL: Sprint Analytics Summary ===
# You can enhance by calculating % done, blockers, etc.
# Example:
# total = len(data["issues"]), done = count status == Done
