import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pretextFilter'
})
export class PretextFilterPipe implements PipeTransform {

  transform(items: any[]): any {
    if (!items) {
      return items;
    }
    return items.filter(item => item.pretext);
  }

}
