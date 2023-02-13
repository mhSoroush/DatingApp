- Update Entities
    - if we have already a migrations, we dont need to specify `-o output dir.`
    - `dotnet ef migrations add someName` 
    - `dotnet ef database update`
- Data Transfer Object (DTO):
    - We dont pass the body of our `post request` via `URL`. So if we pass via the `body`, then we need DTOs classes to have the same variable names as `body of the post request`. 
    - Since the `body of the post request`is a json file, it is written in lower case, while the `DTOs` is in `Pascal Case`, and it is not a problem. 
    - `DTO` class is good to validate instead of `Entity` class. 
- `[ApiController]` attribute:
    - It binds the body the of `post request` to the controller. Otherwise, we need to use `[fromBody]`
    - We can validate the `post request` in `DTO` with `[Required]` before passing to the `Controller class`
- `Json Web Token (JWT)`: to create token when a user has valid username and password. For the rest of `Http request` the server has the `private key of that token`. So it does not need to create `session` so for each `Http request` it send the token with the `Http request` and vaidate it with `Private token key`, in such case the server doen't need to query the datase. 
- `Token Services`:
    - `AddTransient`: It create and dispose by instantiating the controller. It has very short time, but it works fine. 
    - `AddScoped`: It instantiates the controller by `Http request` and the framework `create the token services` and disposed by the end of `Http request`. Optimal option. 
    - `AddSingleton`: It creates the `token services` when the application starts and dispose when the appliction has closed down. 
- How to install `JWT`:
    - `Command + p`, `> Nuget`, search for `System.IdentityModel.Tokens.Jwt by Microsfot`
- What is `SymmmetricSecurityKey` and `aSymmmetricSecurityKey`:
    - `SymmmetricSecurityKey`: The same key used to encript the data as it decript the data. like `JWT` it has only `private key` in the server side, it has on `Public key`.
    - `ASymmmetricSecurityKey`: It uses two keys `private key` to encript on the server side and `public key` on the browser to decript the key. like `ssl in Http request`. 
- `TokenKey`: in the `TokenService.cs` must be defined in the `Appseting.Devlopement.json`
- paste the token in the `jwt.ms` to see the details. 
- to authorize each controller we use `[Authorize]`, if we want to allow any `Http request` then write `AllowAnonymous`  
- In order to authenticate the middleware that receive an OpenID connnect Berear token. Without middleware bereat token the `[Authorize]` for controller remain unauthorized.
    - go to `> Nuget Gallery`
    - search for `Microsoft.AspNetCore.Authentication.JwtBearer by Mircrosoft`
    - `app.UseAuthentication()`: Do you have a valid token.
    - `app.UseAuthorization()`: Are you allowed
- To test in the postman:
    - Key: wirte `Authorization`
    - Value: wirte `Bearer paste_the_token`

