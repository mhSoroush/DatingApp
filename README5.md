# Entity Framework
- How to create one to many relationship in EF
    - We are in the user class and add the following field
    - public List<Photo> photos {get; set;} = new();
- The EF will create a table with the Name `Photo` (class name), if we want to have diffent name for Entity, then we add this over the class name `[Table(Photos)]`, so now the `EF` will create an Entity `Photos` instead `Photo`.
- we can add migrations by the following command 
    - `dotnet ef migrations add someName`
    - We can then delete the migration before `update` by the following command 
    - `dotnet ef migrations remove`
    - If we want to apply these migration on Databases, we run this command
    - `dotnet ef database update`
    -  to see the changes write in the `command pallate` `>sqlite database`
- What is `Repository Pattern`
    - It is an abstraction of `Entity Framework`, so instead of calling the same `query` for each `Controller`, it `Encapsulate` the methods of `FirstOrDefualut and so on` to a method in the repository `getUsers`.
    - So it has the following benefits:
        - Reduce codes
        - Easier to test because instead of testing DbContext, it is easier to test IRepository.
    - So we ecapsulate each queries in the repository and inject the IRepostory in the controller class. 

- What is AutoMapper? 
    - We need a Dto to only return those fields of an entity in the front-end, for
    - Create a `Helper` folder
    - Create a class `AutoMapperProfiles`
    - Add as services `services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies())`
    - We inject the `IMapper mapper` in the constructor of `Controller`
    - We used projection instead of Include for join entities. The Projection will be added on Repository rather than Controller. 







    
        