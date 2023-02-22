# client side
- creating component
    - `ng g c nav --dry-run`: shows the files to be created before its creation. 
    - `ng g c nav --skip-tests --dry-run`: skip to create the test files
- creating services
    - services is used to centralize the `Http requests`
    - services is initiallized when the root moddule is initialized and remian alive until the app module is alive
    - `ng g s _services/account --skip-tests`: to create the services
- Promises vs Observables
    - promis is 
        - `singel future value`
        - can not cancel
        - Not lazy
    - Observable is 
        - `multiple value over time`
        - lazy
        - able to cancel
        -  can use with `mpa`, `filter`, `reduce`, and other operators
- RxJs is `Reactive Extention for Javascript`
    - using `.pipe()` to transorm the subscribed data. 
- using `async` as pipe to use the observer in the html page. `async` unscubscribed automaticlly. 

- dotnet ef database drop
- dotnet ef database update




    
        