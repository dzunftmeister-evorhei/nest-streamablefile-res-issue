import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/fileTestInline')
  async getFileTestInline(
    @Res({ passthrough: true }) response,
  ): Promise<StreamableFile> {
    const dynmaicFileName = `test_${Date.now()}.svg`;
    response.header('Content-Type', 'image/svg');
    response.header(
      'Content-Disposition',
      `inline;filename=${dynmaicFileName}`,
    );

    const file = createReadStream(join(process.cwd(), 'logo_text.svg'));
    return new StreamableFile(file);
  }

  @Get('/fileTestDownload')
  async getFileTestDownload(
    @Res({ passthrough: true }) response,
  ): Promise<StreamableFile> {
    const dynmaicFileName = `test_${Date.now()}.svg`;
    response.header('Content-Type', 'image/svg');
    response.header(
      'Content-Disposition',
      `attachment;filename=${dynmaicFileName}`,
    );

    const file = createReadStream(join(process.cwd(), 'logo_text.svg'));
    return new StreamableFile(file);
  }
}
