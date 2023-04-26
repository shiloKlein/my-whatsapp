import { Directive, ElementRef, forwardRef, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[contenteditable][formControlName],[contenteditable][formControl],[contenteditable][ngModel]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgContentEditableModelDirective),
      multi: true
    }
  ]
})
export class NgContentEditableModelDirective implements ControlValueAccessor {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event.target']) onInput(target: HTMLElement): void {
    this.onChange(target.innerHTML);
  }

  // ControlValueAccessor interface methods
  writeValue(value: any): void {
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', value);
  }

  private onChange = (_: any) => {};
  private onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}



