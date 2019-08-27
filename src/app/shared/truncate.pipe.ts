import { Pipe, PipeTransform } from '@angular/core';
/*
 * Truncate text
 * Takes a limit argument that defaults to 10.
 * Usage:
 *   value | mcvodTruncate:limit:trail
 * Example:
 *   {{ 'truncate text' | mcvodTruncate:5 }}
 *   formats to: 'trunc...'
*/

@Pipe({
  name: 'mcvodTruncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, exponent: string) : string {
    let limit = parseInt(exponent, 10);
    limit = isNaN(limit) ? 10 : limit;
    let trail = '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
