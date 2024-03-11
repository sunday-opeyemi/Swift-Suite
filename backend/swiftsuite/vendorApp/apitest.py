# import requests
# import json 

# user_credentials = {
#     'email': 'dami@gmail.com',
#     'password': 'pass1234'
# }

# # Make a request to obtain authentication token
# response = requests.post('http://127.0.0.1:8000/accounts/login/', data=user_credentials)
# token = response.json().get('access_token')  # Adjust to match the actual key returned by the token endpoint

# if token:
#     # Include the token in the request headers
#     headers = {'Authorization': f'Token {token}'}

#     # Make a request to the authenticated endpoint
#     response = requests.get('http://127.0.0.1:8000/vendor/vendor-enrolment/', headers=headers)
#     if response.status_code == 200:
#         try:
#             data = response.json()
#             print(data)
#         except requests.exceptions.JSONDecodeError:
#             print("Response is not valid JSON:", response.text)
#     else:
#         print("Request failed with status code:", response.status_code)


#     # Handle the response as needed
    
# else:
#     print("Failed to obtain authentication token")
