import { Pipe, PipeTransform } from '@angular/core';
/*
 * Format amount invoice
 * Takes an argument that defaults to 2.
 * Usage:
 *   value | mcvodAmount:exponent
 * Example:
 *   {{ 237 | mcvodAmount:2 }}
 *   formats to: 2.37
*/
@Pipe({name: 'mcvodAmount'})
export class AmountPipe implements PipeTransform {
  transform(value: number, exponent: string): number {
    let exp = parseInt(exponent, 10);
    exp = isNaN(exp) ? 2 : exp;
    return value / Math.pow(10, exp);
  }
}
