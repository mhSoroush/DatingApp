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

- Why routing
    - is a way to direct the user into a page. Each component has a `path` that the routerLink direct the user to that component by default or by a button event.    
- Why `route guard`
    - Is a away of preventing components from unauthorized users. 
        - `ng g g auth --skip-tests`
    - `auth guard` is a security, but it is just hidden of something. The security is on the `API` side. 
- How the `route guard` works
    - If the idea be prevent links, if the user is not logged in.
    - If the user logged in then the component propagate an event `(observable)`.
    - The `auth guard` only sees, if the `observable` of the logged in `user` has `user object` then return `True` otherwise `false`. 
    - To avoid a component, we write in `app-routing-module` `canActivate:[AuthGuard]`. 
    - `An important point` that auth `auth guard` doesn't require `subscription` and `unsubscription` for `observable`.

- What is `Module`
    - Module in this app is uded to separate the installed third party libraries in a `Module` and then import that `Module` in the `import of app.module`.







    
        