import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mask'
})
export class MaskPipe implements PipeTransform {

  transform(value: string, visibleChars: number = 6): string {
    if (!value || value.length <= visibleChars) {
      return value;
    }

    const maskedPart = '*'.repeat(value.length - visibleChars);
    const visiblePart = value.slice(-visibleChars);

    return `${maskedPart}${visiblePart}`;
  }
}