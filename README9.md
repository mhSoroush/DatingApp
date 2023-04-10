- `Reactive Form`
    - registerForm: FormGroup = new FormGroup({});
    - initailize the FormControls from ngOnInit();
        - this.registerForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        )}

- Instead to create each `input form`, we create a component and make   the `input form` generic.
    - for different `type="{{type}}"` we can create differnt type of `input form`. So, we list different `error message` under that `input form`
    <input 
        type="{{type}}"
        [class.is-invalid]="control.touched && control.invalid"
        class="form-control"
        [formControl]="control"
        placeholder={{label}}
    >
    <div class="invalid-feedback" *ngIf="control.errors?.['required']">
        Please enter a {{label}}
    </div>

- The component should `implements ControlValueAccessor`, it acts like a bridge between Angular Forms API and elements of DOM. 
    - `export class TextInputComponent implements ControlValueAccessor {
            @Input() label = '';
            @Input() type = 'text';    
      `
- From the partent component, we choose to create the form inputs. 
    - <app-text-input [formControl]="$any(registerForm.controls['username'])" [label]="'Username'"></app-text-input>
    <app-text-input [formControl]="$any(registerForm.controls['password'])" [label]="'Password'" [type]="'password'"></app-text-input>

- `FormBuilder`
    - Injecting `FormBuilder in the constructor`, then instead of useing `new FormGroup` and `new FormControl`, use `group` and `[]` respectively. 
        - this.registerForm = this.fb.group({
        username: ['', Validators.required],
        })

