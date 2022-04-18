import {Injectable} from "@nestjs/common";

@Injectable()
export class AuthStrategy {
  async validate(): Promise<any> {
    return null;
  }
}
