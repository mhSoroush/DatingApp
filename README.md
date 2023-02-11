#.Net with Angular
- Install .Net SDK from dotnet.microsoft.com
- Innstal Node to complile the angular to js code
    - Install Node.js with NVM 
##.Net
- mkdir DatingApp
- dotnet --info
    - shows the curretn version of .Net SDK
- dotnet -h 
    - shows all information such 
    - new, sln and many more. 
    - dotnet new -h
    - dotnet new list
        - webapi
        - solution file (sln)
- dotnet new sln: to create the solution file
    - Solution is not needed, but it helps to open the entire project by opening the sln file. 
- dotnet new webapi -n `API`
    -  to add API in the solution
    - dotnet sln -h
    - dotnet sln add API/
    - dotnet sln list: to show the list of added project in the solution file.
- code . 
    - if not open
    - command + p, `>path`, `Shell Command: Install 'code' command in PATH` 
- Installation of extension
    - C# for visual studio code from Microsoft.
        - tick some features like `Enable Import Completion`
    - C# Extensions from JosKreativ to right clike and show the creating new class.
    - Compact Folders: VScode `Preferences`, `Settings`, `write compact`, untick `Explorer: Compact Folders`.
- cd `API`
    - `API` dotnet run
    - to run with https 
        - dotnet run -lp https 
        - It gives an error
    - to remove the error
        - dotnet dev-certs https --clean
        - require the system password
    - dotnet dev-certs https --trust
- you can change the localhost port number in `Properties/launchSettings.json`. 
- access the localhost via webpage
    - lohcalhost:port#:weatherforcast
    - localhost:port#/swagger/index.html
- `API.csproj` : contain the installed packages, so remove packages run
    - dotnet restore
- `Program.cs`: the entry point of the webapi project
    - dotnet run command is runing this file
    - all services in this file must be before `builder.Build()`
- Entity Framework
    - It derives DbContext to link the entity model to Database
    - Entity Framwork usage:
        - Quering
        - Change Tracking
        - Savign
        - Concurrencty
        - Transactions
        - Caoching
        - Built-in conventions
        - Configurations
        - Migrations
- How to install EF
    - Nuget
    - Extension: `Nuget Gallery` install
    - Once installed, go to command pallete and write `>nuget`
    - click on `Open Nuget Gallery`
        - Microsoft.EntityFrameworkCore.Sqlite by Microsoft
        - Microsoft.EntityFrameworkCore.Design by Microsoft
    - If check the `API.csproj` the installed packages are there. 
    - Installing packages of `Nuget` does not require `dotnet restore`

- Add `Entity` folder for each entity model 
- Add `Data` folder for DataContext: DbContext
    - to add each entity int the DataContext class
    - public DbSet<AppUser> `Users` {get; set;}
    - the `Users` is added in the database as table `Users`
- Register the DbContext in the `Program.cs`
    -  add `Connectionstring`
- `appsettings.Development.json`: is for development mode.  
    - connectionstring and database name are added here
- We need a tool to do `dotnet-ef` command like
    - dotnet ef migrations add
    - dotnet ef migrations list
    - dotnet ef migrations script
    - dotnet ef dbcontext info
    - dotnet ef database drop
    - dotnet ef database update
    -`this will be added at some points in the dotnet cli`
- install `nuget.org/packages/dotnet-ef/`:
    - to check whether installed or not
        - dotnet tool list -g
    - dotnet tool -h 
        - give more options: `update`, `list`, `uninstall` 
- `dotnet ef`
    - it list the these commands:
        - database
        - dbcontext
        - migrations
    - `dotnet ef database update`: create the database
    - `dotnet ef migrations add InitialCreate -o Data/Migrations`
        - it will create a the class `InitialCreate` under `Data/Migrations` directory. 
        - -o is the output path. if not defined, then it will create `Migrations`.
- to remove `this` in the `ctor` private variable
    - go the the C# Extensions setting. 

- create gitignore with dotnet command to add ignore files automatically. 
- dotnet new gitignore
    - add `appsettings.json`: it has settings for production 

---
# Installing Angullar
- go to the `angular.io` website and check the `node` version in `package.json`.
- `npm install -g @angular/cli` install the latest version
- `npm install -g @angular/cli@14` install the latest version of `14`
- `ng version` to see the installed version of angular 
- make sure you are in this directory `DatingApp`
- ng new `client`
- cd `client`
    - `ng server` to run the angular application
- Angular structure:
    - `AppModule`: boots the components
    - `main.ts`: will boots the `AppModule` 
- install extension
    - `Angular Language Service`
- to connect to the `API` we need `HttpClinetModule`
    - We add `HttpClinetModule` in `AppModule`
    - 
- `CORS Policy error`
    - go to `Program.cs`
        - `builder.Services.AddCors();`
        - `app.UserCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"))`
- install `ngx-bootstrap`
    - make sure you are in the `client` directory
    - `ng add ngx-bootstrap`
    - if you get error, then install manullay
    - `npm install font-awesome`
    - they are added in the package.json
-  to link `bootstrap css` with our project
    - go to `angular.json`, add before the dev `golobal styles`
    - "styles":[
        "./node_modules/ngx-bootstrap/datapicker/bs-datapicker.css",
        "./node_modules/bootstrap/dist/css/bootstrap.min.css",
        "./node_modules/font-awesome/css/font-awesome.min.css",
        "crc/styles.css "
    ]
- Using HTTPS in angular
    - two files `server.crt` and `server.key` are provided
    - double click on file `server.crt`
    - now opne `keychain access` you can see `localhost`
    - double click on the `localhost` you will see the certificate. on the Trust button select `alwasy`
    - it asks for your system password 
    - under the `client` directory create a folder `ssl` and paste both files there.
    - go to `angular.json`
        - under the `serve` not `build` to specity the certificate we are using: 
            - "optitions": {
                "sslCert": "./ssl/server.crt",
                "sslKey": ".ssl/server.key",
                "ssl": true
            }
    - run `ng serve` you will see now the https://localhost:4200

