- Some note about `Form`
    - What is `#formName="ngForm"`
        - We use `#formName` to access the form in the typescript. `@ViewChild('formName') editForm: NgForm | undefined;` 
        - Then we can use `this.formName?.reset(default modle value)`
        - We can also see the condition of the form, ex., formName.dirty
    - Why we need to use id=someName in a form
        - `<form #editForm="ngForm" id="editForm" (ngSubmit)="updateMember()">`
        - if the `submit button` is not in the form `tag`, then `id="editForm"` will help to submit the form with a button from somewhere else in the webpage. 
        - <button type="submit" form="editForm">Submit</button> 
    - What is `@ViewChild` 
        - Form is template and it is a child of component. In order to access the template in the component file, we need to use `@ViewChild('formName') editForm: NgForm | undefined;` 

- Ngx Spinner
    - start when an HttpRequest start and finish with HttpRequst stop
    - Since, it is handable with HttpRequest, we can use interceptor to implement.

- When a list of data are used by different components, then it is better to store them in the services rather than each components
    - It avoid to call each time the server
    - Then in the component we use obserble `members$: Observable<Member[]> | undefined;` instead of `members : Member[] = [] | undefined`.
    - then we call the service function inside the ngOnInit `this.members$ = this.memberSerivice.getMembers();`
    - Finally in the HTML `let member of members$ | async`



