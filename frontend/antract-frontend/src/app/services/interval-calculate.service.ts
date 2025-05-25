import { Injectable } from '@angular/core';
import { Note } from './Note';
import { TriadCalculateService } from './interval-calculate/triad-calculate.service';

@Injectable({
  providedIn: 'root'
})
export class IntervalCalculateService {
  triadCalculateService: TriadCalculateService;

  constructor(triadCalculateService: TriadCalculateService) {
    this.triadCalculateService = triadCalculateService;
}
}
