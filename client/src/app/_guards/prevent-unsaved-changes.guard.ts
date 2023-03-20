import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent> {
  canDeactivate(
    component: MemberEditComponent): boolean {
      if (component.editForm?.dirty){
        // The confirm return boolean
        return confirm('Are you sure you want to continue? Any unsaved chagnes will be lost');
      }
      return true;
    }
  
}
