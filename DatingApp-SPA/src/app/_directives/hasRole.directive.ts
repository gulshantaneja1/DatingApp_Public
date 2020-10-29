import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Directive, TemplateRef, ViewContainerRef, Input , OnInit } from '@angular/core';
import {AuthService} from '../_services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective  implements OnInit {

@Input() appHasRole: string[];
isVisible = false;

  constructor(private viewContainerRe: ViewContainerRef, private templateRef: TemplateRef<any>,
    private authService: AuthService) { }


    ngOnInit()
    {
      const userRoles = this.authService.decodedToken.role as Array<string>;

      // if tno roles clear the viewContainer Ref
      if (!userRoles)
      {
        this.viewContainerRe.clear();
      }

      // if user has role need then render the element

      if (this.authService.roleMatch(this.appHasRole)){

        if (!this.isVisible) {
          this.isVisible = true;
          this.viewContainerRe.createEmbeddedView(this.templateRef);
        }
        else{
          this.isVisible = false;
          this.viewContainerRe.clear();
        }
      }


    }

}
