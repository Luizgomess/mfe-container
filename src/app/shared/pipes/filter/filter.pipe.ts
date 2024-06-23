import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], name: string): any[] {
    
    let itemsFiltered = [];
    itemsFiltered = items.filter((item: any) => {
      if (name == "") {
        return item;
      }
      return item.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
    });

    return itemsFiltered;
  }
}
