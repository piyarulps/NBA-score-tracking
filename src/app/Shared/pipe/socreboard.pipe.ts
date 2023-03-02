import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'socreboard'
})
export class SocreboardPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
