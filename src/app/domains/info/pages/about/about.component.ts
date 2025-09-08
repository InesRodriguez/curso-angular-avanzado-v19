import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { CounterComponent } from '@shared/components/counter/counter.component';
import { HighlightDirective } from '@shared/directives/highlight.directive';

import { WaveAudioComponent } from '@info/components/wave-audio/wave-audio.component';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, delay, Subject } from 'rxjs';

@Component({
  selector: 'app-about',
  imports: [
    CommonModule,
    FormsModule,
    CounterComponent,
    WaveAudioComponent,
    HighlightDirective,
  ],
  templateUrl: './about.component.html',
})
export default class AboutComponent {
  $duration = signal(1000);
  $message = signal('Hola');

  obsWithInit$ = new BehaviorSubject<string>('init value');
  $withInit = toSignal(this.obsWithInit$, {
    requireSync: true,
  });

  obsWihtoutInit$ = new Subject<string>();
  $wihtoutInit = toSignal(this.obsWihtoutInit$.pipe(delay(3000)), {
    initialValue: '-----',
  });

  changeDuration(event: Event) {
    const input = event.target as HTMLInputElement;
    this.$duration.set(input.valueAsNumber);
  }
  emitWithinInit() {
    this.obsWithInit$.next('new value');
  }
  emitWihtoutInit() {
    this.obsWihtoutInit$.next('****');
  }
}
