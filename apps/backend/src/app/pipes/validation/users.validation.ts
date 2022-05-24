import {ArgumentMetadata, BadRequestException, Inject, Injectable, PipeTransform} from "@nestjs/common";
import {validate} from "class-validator";
import {plainToClass} from "class-transformer";
import {UsersRequestPayload} from "../../payload/request/users.payload";

@Injectable()
export class UsersValidation implements PipeTransform<any> {


  async transform(value: UsersRequestPayload, {metatype}: ArgumentMetadata): Promise<UsersRequestPayload> {
    if (!metatype || !this.validateMetaType(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    console.log(errors);

    if (errors.length > 0) {
      throw new BadRequestException(Object.values(errors[0].constraints)[0]);
    }

    return value;

  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private validateMetaType(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
