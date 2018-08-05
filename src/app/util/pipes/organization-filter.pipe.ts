import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'organizationFilter'
})
export class OrganizationFilterPipe implements PipeTransform {

  transform(organizations: Array<any>, type: string): any {
    return organizations.filter(organization => organization.type === type).length;
  }

}
