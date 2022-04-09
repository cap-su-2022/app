import {HttpException, HttpStatus} from "@nestjs/common";

export class NoSuchElementFoundException extends HttpException {
  constructor(msg = 'No such element found') {
    super(msg, HttpStatus.NOT_FOUND);
  }
}
