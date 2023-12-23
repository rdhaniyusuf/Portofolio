import requests
import json
from datetime import datetime

def get_github_repo_info(username):
	url = f'https://api.github.com/users/{username}/repos'
	response = requests.get(url)

	if response.status_code == 200:
		repos = response.json()
		repository_data = []
		for repo in repos:
			created_at = datetime.strptime(repo['created_at'], "%Y-%m-%dT%H:%M:%SZ").strftime("%Y-%m-%d %H:%M:%S")
			languages = repo['languages_url']
			languages_response = requests.get(languages)

			if languages_response.status_code == 200:
				lang_data = languages_response.json()
				repo_languages = list(lang_data.keys())
			else:
				repo_languages = ['Not specified']
			
			repo_info = {
				"project-year" : created_at,
				"project-name": repo['name'],
				"project-made-for": repo['description'],
				"project-made-with": repo_languages,
                "project-link": repo['html_url']
                # Add more fields as needed
            }
			repository_data.append(repo_info)

        # Save data to a JSON file
		with open('repositories.json', 'w') as json_file:
			json.dump(repository_data, json_file, indent=2)

		print("Data saved to repositories.json.")
	else:
		print(f"Failed to retrieve information. Status code: {response.status_code}")

if __name__ == "__main__":
	github_username = "rdhaniyusuf"

	get_github_repo_info(github_username)
