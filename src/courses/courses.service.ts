import {  Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
// import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class CoursesService {
  constructor (private readonly prisma: PrismaService){}
  
  create(createCourseDto: CreateCourseDto) {
    return this.prisma.courses.create({data: createCourseDto});
  }

  findAll() {
    return this.prisma.courses.findMany({select: {id: true, name: true, type: true, length: true, instructor: true}})
  }

  async apply(courseId: number) {
    const foundCourse = await this.prisma.courses.findUnique({where: {id: courseId}})
    if (!foundCourse) {
      throw new NotFoundException("Nincs inlyen kurzus")
    }
      const applyCourse = await this.prisma.applications.create(
        {
          data: {
            course_id: courseId,
            price: foundCourse?.length ? foundCourse.length * 500 : 0,
          }
        }
      );
      return applyCourse; 
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} course`;
  // }

  // update(id: number, updateCourseDto: UpdateCourseDto) {
  //   return `This action updates a #${id} course`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} course`;
  // }
