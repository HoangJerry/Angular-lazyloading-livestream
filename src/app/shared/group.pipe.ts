import { Pipe, PipeTransform } from '@angular/core';
/*
 * Group items
 * Takes an argument that defaults to 6.
 * Usage:
 *   data | mcvodAmount:limit
 * Example:
 *   {{ [5, 3, 3] | mcvodGroup:2 }}
 *   formats to: [
       {'videos': [5, 3], 'active': false},
       {'videos': [3], 'active': false}
     ]
*/
@Pipe({name: 'mcvodGroup'})
export class GroupPipe implements PipeTransform {
  transform(data: any[], limit: number): any[] {
    let groupedData = [];
    let temp = [];
    let numberItem = limit;
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (i < numberItem) {
          temp.push(data[i]);
        } else {
          numberItem += limit;
          groupedData.push({
            'videos': temp,
            'active': false
          });
          temp = [];
          temp.push(data[i]);
        }
      }

      if (temp.length > 0) {
        groupedData.push({
          'videos': temp,
          'active': false
        });
      }
    }
    
    return groupedData;
  }
}