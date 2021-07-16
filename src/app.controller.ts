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

  @Get('/test')
  getTest(): string {
    return `
      <!doctype html>

      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>test</title>
        </head>
        
        <body>
          <img width="200" src="/fileTestInline" />
        </body>
      </html>
    `;
  }

  @Get('/fileTestInline')
  async getFileTestInline(
    @Res({ passthrough: true }) response,
  ): Promise<StreamableFile> {
    const dynmaicFileName = `test_${Date.now()}.svg`;
    response.setHeader('Content-Type', 'image/svg+xml');
    response.setHeader(
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
    response.setHeader('Content-Type', 'image/svg');
    response.setHeader(
      'Content-Disposition',
      `attachment;filename=${dynmaicFileName}`,
    );

    const file = createReadStream(join(process.cwd(), 'logo_text.svg'));
    return new StreamableFile(file);
  }
}
