import {Injectable} from "@nestjs/common";
import admin from '../config/firebase.config';
import {OAuth2Client} from 'google-auth-library';
import {InjectRepository} from "@nestjs/typeorm";
import {Users} from "../models/users.entity";
import {Repository} from "typeorm";

@Injectable()
export class AuthService {

  constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>) {
  }

  async handleGoogleSigninWithIdToken(idToken: string): Promise<any> {
    const client = new OAuth2Client('fptu-library-booking');
    console.log(idToken);
    const decodedToken = await client.verifyIdToken({
      idToken: idToken,
      audience: [
        'fptu-library-booking',
        '1013204251190-74m7mtno9e3ge4fdie3422hotor5217c.apps.googleusercontent.com'
      ]
    })
    const userGoogleId = decodedToken.getUserId();
    const user = await this.usersRepository.findOne({
      where: {
        'googleId': userGoogleId
      }
    });
    console.log(user);

    return user;
  }
}
