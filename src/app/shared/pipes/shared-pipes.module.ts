import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncateTextPipe } from './truncate-text.pipe';
import { ImagenPipe } from './imagen.pipe';

const pipes = [ TruncateTextPipe, ImagenPipe ];

@NgModule({
  imports: [
    CommonModule 
  ],
  declarations: pipes,
  exports: pipes
})
export class SharedPipesModule {}
