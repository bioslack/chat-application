# Chat Application
## Instructions

1. In the project's root directory add a .env file with the same settings of .env.example file

2. In the backend/ directory add a .env file with the following line

``` 
DATABASE_URL=postgresql://<db-user>:<db-password>@postgres:5432/chat-app?schema=public
```
3. At the project's root directory, run following command:

```
./setup.sh
docker compose up -d frontend
```
