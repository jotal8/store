import { Component, Input, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input ({ required: true }) duration = 0;
  @Input ({ required: true }) message = '';
  
  counter = signal(13325);
  
  counterRef: number | undefined; 

  constructor(){
    // NO ASYNC
    // before render
    console.log('constructor');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges) {
    //before and during render
    console.log('ngOnChanges');
    console.log('-'.repeat(10));

    console.log(changes);
  }

  ngOnInit() {
    // after render
    // once
    // async, then, subs...
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('duration =>', this.duration);
    console.log('message => ', this.message);

    this.counterRef = window.setInterval(() => {
      this.counter.update(prevValue => prevValue+1);
    }, 1000);
  }

  ngAfterViewInit() {
    //After Render
    // children rendered
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy(){
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
    window.clearInterval(this.counterRef);
  }
}