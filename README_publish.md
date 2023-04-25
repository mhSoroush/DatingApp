-  `search for localhost`
    - replace all localhost link to production environment
    - environment.apiUrl

- `Create the physical files`
    - in `angular.json` - file under `build`, `outputPath` the built files will be created 
    - the default is `dist/client`, but we want to create a different path under `API` as follows: `"outputhPath"`: "..API/wwwroot"
    - Now we have to tell the `program.cs` file that we have a custom physical built files as follows:
         - We put these two command `app.UseDefaultFiles();` and `app.UseStaticFiles();`. These two command must be after `app.UseAuthorizaton();` and before `app.MapControllers();`.
    - `app.UseDefaultFiles();`: It uses the defaut file `index.html`
    - `app.UseStaticFiles();`: Becuse we changed `dist/client` to `../API/wwwroot`  

- Create Production build
    - go to the `client` directory, and write `ng build --configuration production --aot`
    - if you get an error of `bundle initial exceeded maximum budget.` then:
        - Go to `angular.json` file under "budgets" change
            - "maximumWarning": "1mb",
            - "maximumError": "2mb"
    - run again `ng build` if you got an error of size exceed
    - the folder with physical files of angualr is created in `wwwroot`. 
    - Now if you run `dotnet run`, you can access the client pages under the `api url` directly. But if `refresh` the webpages then, the webpages are not available anymore becasue `routing` need to be implemented. 

- Adding `FallbackController`
    - In order to pass routing responsibility from `wwwroot` directory to Angular. we create an `Controller` in the API.
    - We add the FallbackController to the `middle ware` in `program.cs`
        - `app.MapFallbackToController("Index", "Fallback");`
        - the name `"Fallback"` is the name of `FallbackController` so we write without `Controller`.

- Remove fake loading delay
    - in the `development` we had extra `delay(1000)` to really see the loading, but in the `production` we dont need that. 
    - the delay was in the `loadingInterceptor` and add this
    - `(environment.production ? identity : delay(1000))` here identity is used instead of `null`, since we cannot return null. 

- After any changes run `ng build` because it is `Static` files.   

- Install Docker desktop from `docker.com`
    - after installation, you are able to wirte `docker` in the root directory of the app.
    - run this command in DatingApp root directory to create the postrgreSQL in the docker desktop.
    - `"docker run --name postgres -e POSTGRES_PASSWORD=simplePass -p someport:someport -d postgres:latest"`
        - `--name postgres`: give a name of `postgres` for the installed DB in docker env.
        - `-e`: is the environment 
        - `-p`: is the port
        - `-d`: detached mode
        - `postgres:latest`: install the latest version of postgres. 
    
    - Install `postgreSQL` in the `vs code`
        - go the extensions, search for `PostgreSQL` from Kolkman.
        - you are able to see the icon in sidebar

    - Go to `NuGet Gallery` search for `Ngpsql.EntityFrameworkCore.PostgreSQL` by Shay Rojansky ...
    - remove the previous DB.
        - `cd API/` 
        - run `dotnet ef database drop`
    - change the provious connectionString
        - go to `appsettings.Development.json`
        - previous connectionString: "Data source=datingapp.db"
        - new: "Server=localhost; Port=####; User Id=somename; Password=somePassword; Database=datingapp"
    - Go to `ApplicationServiceExtensions.cs` to change the `DataContext` DB provider
        - change from `UseSqlite(config...)` to `UseNpgsql(config...)`
    - Delete `Migrations` folder with snapshots
    - Create new Migrations
        - dotnet ef migrations add PostgresInitial -o Data/Migrations
    - run `dotnet run`, if error arised, fix it and then
        - `dotnet ef database drop` and run again `dotnet run` 
        - continue until `Info` with green colors
        - NOTE: we dont need to run migration after the error. 

- connect the installed `PostgreSQL` in `vs code` with `Docker`
    - click on the icon of `PostgreSQL` and follow the instructin 
        - Use the standard connection, not ssl connection

- `Fly.io` is used to deploy the app
    - `Fly.io` doesn't support `.Net` therefore, we convert the `.Net` code to `dockerfile` and deploy it into `Fly.io`.
    - install the `docker extension` for `vs code` to have a better contorl on this conversion
    - after installing the `docker extension` made by `microsoft` is visibel in the sidebar of `vs code`

- Dockerizing our app
    - create a file `Dockerfile` under `API` folder
        - the purpose of this `Dockerfile` is to create the image of dotnet app
    - create a `.dockerignore` file under `API` folder 
        - the purpose of this file is ignore copying of files like `**/bin` and `**/obj` because they will be created by some command through `Dockerfile` like `dotnet restore and dotnet publish`.
    - we want to run the `Dockerfile`. To run the file we need to run the followoing command. So first we need to:
        - `cd API/`  
        - `docker build -t mhsoroush/datingapp .`
            - `mhsoroush`: is the docker hub username
            - `datingapp`: will create a repository
            - `.` is everything in the container
        - Now you able to see the created image in the docker icon in the sidebar

    - we want to run the created image from the docker
        - `cd API/`
        - `docker run --rm -it -p 8080:80 mhsoroush/datingapp:latest`
            - `--rm`: remove after quit the run
            - `-it`: iterative mode, meaning to see the logs as well
        -  you will get an error of DB connection, because for the `productino env` in `appsettings.json` we didn't specify DB connection 
        - We copy the `ConnectionString` and the `TokenKey` into `appsettings.json`:
            - we need to change the `Server=localhost` to `Server=host.docker.internal` bacasue now the `dotnet image` is also in the docker container. So instead of `localhost` it should use the `internal docker host`. 
        - after each edit of the `dotnet code` we have to run first `docker build` and then `docker run`
        - before executing `docker run` we have to run `dotnet ef database drop` to avoid coppying the running local DB. 
        - Now you can browse the app through `localhost:8080` without https. 

    - we want to `push` the created image to the `docker hub` to access our app in the could platform
        - `cd API/`
        - `docker push mhsoroush/datingapp:latest`

- Deploying app
    - create an account with `fly.io`
    - go to solutin directory
    - `fly launch --image mhsoroush/datingapp:latest`
    - follow the instruction and questions
    - finally, it creates the `fly.toml` in the directory
    - this file has the following information
        - image of the app
        - port to access the app
        - `[env]` variables 
            - in the `[env]` we put not secret keys
            - ASPNETCORE_URLS="http://port"
                - `port` must be 'EXPOSE port' in the `Dockerfile` as well
            - CloudinarySettings
        - we put these information from `appsettings.json` in the `[env]` because the image doesn't have access to the `appsettings.json`
    - for the `secret information` 
        - `fly secrets list`
        - we add the Cloudinary ApiSecret as follows
            - `fly secrets set CloudinarySettings__ApiSecret=...`
            - `fly secrets set TokenKey=delinea.com or any other generator`
                - generate password from `delinea.com`
    
    - Connecting `dotnet image` with `Database`
        - if we write `fly secrets list`, it will list secrets keys such as `DATABASE_URL` that contains these informations
            - `ussername`
            - `password`
            - `DB name`
            - `port`
            - other neccessary connnectionStrings
        - in the `development mode` our connectionString was `ApplicationServiceExtensions.cs`, now we bring them in the `Program.cs` file because the cloud platform has access to the `Program.cs` file. Since for the `production mode` we want to access the `DATABASE_URL` from the secrets list in the `Program.cs`. 
            - if development 
                - prevoius old connectionString
            - else:
                - Use `DATABASE_URL`  
    
    - `cd API/`
    - `docker build -t mhsoroush/datingapp .`
    - `docker push mhsoroush/datingapp:latest`
    - `cd ../` to be in solution directory to run `fly.toml`
    - `fly deploy` it works for me, but for some users it will not works because of differet chips


- some extra comments
    - fly postgres attach --app hadi-soroush hadi-soroush-db




    
    

