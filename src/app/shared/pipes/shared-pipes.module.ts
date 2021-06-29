import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncateTextPipe } from './truncate-text.pipe';

const pipes = [ TruncateTextPipe ];

@NgModule({
  imports: [CommonModule],
  declarations: pipes,
  exports: pipes
})
export class SharedPipesModule {}
