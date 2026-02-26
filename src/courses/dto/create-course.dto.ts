import { IsIn, IsNotEmpty, IsPositive, IsString } from "class-validator"

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsPositive()
  @IsNotEmpty()
  length: number
  
  @IsString()
  @IsNotEmpty()
  @IsIn(['partner', 'group', 'solo'])
  type: "solo" | "partner" | "group"
  
  
  @IsString()
  @IsNotEmpty()
  instructor: string
}
