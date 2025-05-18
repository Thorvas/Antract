import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaffGeneratorService {

  constructor() { }

  private mapToNote(staffPosition: number) {

    const roundedPosition = Math.round(staffPosition * 2) / 2;

    

  }
}
