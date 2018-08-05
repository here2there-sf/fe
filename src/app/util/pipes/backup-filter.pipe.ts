import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'backupFilter'
})
export class BackupFilterPipe implements PipeTransform {

  transform(backups: Array<any>, type: string): any {
    return backups.filter(backup => backup.organization.type === type).length;
  }

}
