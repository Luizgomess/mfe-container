import { Pipe, PipeTransform } from '@angular/core';
import { Project } from 'src/app/core/interfaces/project.interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: Project[], name: string): Project[] {
    
    let itemsFiltered = [];
    itemsFiltered = items.filter((item: Project) => {
      if (name == "") {
        return item;
      }
      return item.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
    });

    return itemsFiltered;
  }
}
