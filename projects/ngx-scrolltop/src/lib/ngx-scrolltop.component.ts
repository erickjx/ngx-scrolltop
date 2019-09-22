import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  Inject,
  ElementRef,
  Input,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  NgxScrolltopMode,
  NgxScrolltopTheme,
  NgxScrolltopPosition,
} from './ngx-scrolltop.interfaces';

@Component({
  selector: 'ngx-scrolltop',
  templateUrl: './ngx-scrolltop.component.html',
  styleUrls: ['./ngx-scrolltop.component.scss'],
})
export class NgxScrolltopComponent implements OnInit {
  @Input() backgroundColor: string;
  @Input() symbolColor: string;
  @Input() size: number;
  @Input() symbol: string;
  @Input() position: NgxScrolltopPosition = 'right';
  @Input() theme: NgxScrolltopTheme = 'gray';
  @Input() mode: NgxScrolltopMode = 'classic';

  public show = false;
  private scrolledFromTop = false;
  private scrollOffset: number;

  @ViewChild('scrollTopButton', { static: false }) scrollTopButton: ElementRef;

  @HostListener('window:scroll')
  onWindowScroll() {
    const position: number = this.document.documentElement.scrollTop;
    switch (this.mode) {
      case 'classic':
        this.classicMode(position);
        break;
      case 'smart':
        this.smartMode(position);
        break;
    }
  }

  private classicMode(position: number) {
    if (position > window.innerHeight) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  private smartMode(position: number): void {
    if (position === 0) {
      this.show = false;
      this.scrolledFromTop = false;
    }

    if (this.scrolledFromTop && this.scrollOffset > position) {
      this.show = true;
    }

    if (typeof window !== 'undefined' && position > window.innerHeight * 2) {
      this.scrolledFromTop = true;
      this.scrollOffset = position;
    }
  }

  constructor(@Inject(DOCUMENT) private document: any) {}

  ngOnInit() {}

  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
  }
}
