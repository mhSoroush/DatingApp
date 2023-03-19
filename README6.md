# Front-end
- Using the `Interceptor` to send JWT tokens
    - `Interceptor` is used to manage all httprequest and responces that come or go to the backend. 
    - In order to add token to each send request to the backend, instead we create `Interceptor` to add only `Authorization token` in a intercepter to add automatically for `HttpRequest` to the backend. 
- Using `Route params`
    - We pass a parameters to the `App routing moduel` by `RouterLink` in HTML. Then we use `ActivatedRoute params` to get that params from routing `Snapshot`. `this.route.snapshot.paramMap.get('username')`. `this.route` is a variable of type `ActivatedRoute`.
    







    
        