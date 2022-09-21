import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Mapbox1Service } from './mapbox1.service';
import { CreateMapbox1Dto } from './dto/create-mapbox1.dto';
import { UpdateMapbox1Dto } from './dto/update-mapbox1.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import {parse} from 'papaparse';
import { createReadStream, readFileSync } from 'fs';

@Controller('mapbox1')
export class Mapbox1Controller {
  constructor(private readonly mapbox1Service: Mapbox1Service) {}

  // @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './mapbox',
  //       filename: (req, file, callback) => {
  //         const fileExtName = extname(file.originalname);
  //         callback(null, `${file.originalname}${fileExtName}`);
  //       },
  //     }),
  //     fileFilter: (req, file, callback) => {
  //       if (!file.originalname.match(/\.(csv)$/)) {
  //         return callback(new Error('Only CSV files are allowed!'), false);
  //       }
  //       callback(null, true);
  //     },
  //   }),
  // )
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   const response = {
  //     message: 'File uploaded successfully!',
  //     data: {
  //       originalname: file.originalname,
  //       // filename: file.filename,
  //     },
  //   };
  //   return response;
  // }
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './mapbox',
        filename: (req, file, callback) => {
          const fileExtName = extname(file.originalname);
          callback(null, `${file.originalname}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(csv)$/)) {
          return callback(new Error('Only CSV files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const csvFile = readFileSync(`mapbox/${file.originalname}`);
    const csvData = csvFile.toString();
    const parsedCsv = await parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.toLowerCase().replace('#', '').trim(),
      complete: (results: { data: any; }) => results.data,
    });
    console.log(parsedCsv.data[0]);
    var point = {
      type: 'Point',
      coordinates: [parsedCsv.data[0].lat, parsedCsv.data[0].long],
    };
    // for each loop for add many locations
    parsedCsv.data.forEach((element) => {
      var point = {
        type: 'Point',
        coordinates: [element.lat, element.long],
      };

    const loadData = {
      id: element.id,
      lat: element.lat,
      long:element.long,
      name: element.name,
      city_name: element.city_name,
      location:point,
    };
    console.log(loadData);
    this.mapbox1Service.create(loadData);
    const response = {
      message: 'File uploaded successfully!',
      data: {
        originalname: file.originalname,
        // filename: file.filename,
      },
    };
    return response;
  });
  }
  // @Post('file')
  //   @UseInterceptors(
  //     FileInterceptor('file_asset', {
  //       storage: diskStorage({
  //         destination: './mapbox',
  //       })
  //     })
  //   )
  //   async uploadFile() {
  //     const csvFile = readFileSync('mapbox/1(1).csv')
  //     const csvData = csvFile.toString()
  //     const parsedCsv = await parse(csvData, {
  //       header: true,
  //       skipEmptyLines: true,
  //       transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
  //       complete: (results) => results.data,
  //     });
  //     console.log(parsedCsv)
  //     //console.log(typeof (parsedCsv.data.id))
  //   }
  // @Get()
  // getFile() {
  //   const file = createReadStream(join(process.cwd(), './mapbox/1(1).csv'));
  //   console.log(file);
  // }
  // @Post()
  // create(@Body() createMapbox1Dto: CreateMapbox1Dto) {
  //   return this.mapbox1Service.create(createMapbox1Dto);
  // }

  @Get()
  findAll() {
    return this.mapbox1Service.findAll();
  }
  getFile() {
    const file = createReadStream(join(process.cwd(), './mapbox/1.csv'));
    console.log(file);
  }
}
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.mapbox1Service.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMapbox1Dto: UpdateMapbox1Dto) {
  //   return this.mapbox1Service.update(+id, updateMapbox1Dto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mapbox1Service.remove(+id);
  // }