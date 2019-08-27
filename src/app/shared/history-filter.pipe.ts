import { Pipe, PipeTransform, Injectable } from '@angular/core';
/*
 * Filter history list
 * Takes a limit argument that defaults to 10.
 * Takes a percent argument that defualts to 95.
 * Usage:
 *   value | mcvodHistoryFilter:limit:percent
*/

@Pipe({
    name: 'mcvodHistoryFilter',
    pure: false
})
@Injectable()
export class HistoryFilterPipe implements PipeTransform {
    transform(items: any[], limit: any, percentPlayed: any): any {
      limit = parseInt(limit, 10);
      limit = isNaN(limit) ? -10 : limit * (-1);
      percentPlayed = parseFloat(percentPlayed);
      percentPlayed = isNaN(percentPlayed) ? 95 : percentPlayed;
      // filter items array, items which match and return true will be kept, false will be filtered out
      return items.filter(
        (item: any) => {
          let lengthArr = item.videoID.videoLength.split(':');
          let length = parseInt(lengthArr[0], 10) * 60 * 60 + parseInt(lengthArr[1], 10) * 60 + parseInt(lengthArr[2], 10);
          let played = (item.percentPlayed / length) * 100;
          return played <= percentPlayed;
        }).slice(limit);
    }
}
