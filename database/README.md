# Install

Please install Postgres.

## Mac
1. Download the app from [Postgres.app](http://postgres.app) and copy `Postgres.app` to the Application folder
2. Click "Initialize" to create a new server.
3. In a terminal execute
    ```shell
    alias psql="/Applications/Postgres.app/Contents/Versions/14/bin/psql"
    ```
4. Run [**Load sql**](#load-sql) as seen below.
   

## Linux
1. ????
2. ????
3. ????
4. Profit

## Other
1. Install `postgres`
2. Start `postgres`
3. Run [**Load sql**](#load-sql) as seen below. 


# Load sql

```shell
psql --port=5432 --username="postgres" --file="database/postgres.sql"
```