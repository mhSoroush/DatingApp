-  `Structure`  
    - Create `Entity`
    - if needed `explicitly` write the Join between `Entities` in `DataContext`
    - Create Repository pattern
        - Interface
        - implement the interface
        - add the repository in the `Services` 
        `services.AddScoped<IMessageRepository, MessageRepository>();`
    - Creating `Dto`
        - If there are some extra `field in Dto`, then use `AutoMapper` and write explicit map for extra field. 
        - you are free to create `Dto` class based on the Front-end needs with different size of fields. 
    - Create `Controller for that Entity`
        - when you create `Controller`please stop the `API` and run again `dotnet watch run`

- `queryParams` 
    - passing an object from differen componont through Url 
        - as an example we want to pass this object `tab: 'Messages'` from any component in a button in HTML 
            - `[queryParmas]="{tab: 'Messages'}}"`
        - in the target component we inject `constructor(route: ActivatedRoute)` like `this.route.queryParams.subsribe({...})` because `queryParams` is an observable. 

- `resolver`
    - with the help of `activateRouter` we can load a `data provider` before the component is created. 
    - it is usefull if we navigate from any component to someother component, then the data must be provided already, otherwise working with `@childview` will be undefined if we have some condition on template like first data provided then load `template`.    