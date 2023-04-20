-  `Action Filter`
    - The `Action Filter` is used to update the `LastActive` of a user. The `Action Filter` is executed `before` and `after` an action executed by a controller. 
    - Public class ClassName : IAsyncActionFilter {}
    - In order to use, it is added to `services.AddScoped`
    - we add it to the top a `Controller` to handle after or before action is executed. In order to apply to all `Controllers` we add it on top of the base class of controller. 
        - [ServiceFilter(typeof(FilterClassName))]
- ngx-timeago is installed