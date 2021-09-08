import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AcercaDeComponent],
  exports: [AcercaDeComponent]
})
export class InicioModule { }
