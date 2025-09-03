import { Component } from '@angular/core';
import { Gallery } from '../../../shared/components/gallery/gallery';
import { Metrics } from '../../../shared/components/metrics/metrics';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [Navbar, Metrics, Gallery],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
