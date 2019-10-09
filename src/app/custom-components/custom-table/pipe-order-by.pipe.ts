import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'pipeOrderBy'
})
export class PipeOrderByPipe implements PipeTransform {

  transform(value: any[], expression?: any, reverse?: boolean): any {

    let chars = value;
    let order = 'asc';
    if (reverse === true) {
      order = 'asc';
    } else {
      order = 'desc';
    }

    chars = _.orderBy(chars, expression, order);

    return chars;
  }
}
