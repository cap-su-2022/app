import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import admin from '../config/firebase.config';
import {OAuth2Client} from 'google-auth-library';
import {InjectRepository} from "@nestjs/typeorm";
import {Users} from "../models/users.entity";
import {Repository} from "typeorm";
import Exception from "../constants/exception.constant";
import {ConfigService} from "@nestjs/config";
import {UsersRepository} from "../repositories/users.repository";

@Injectable()
export class AuthService {

  constructor(private readonly usersRepository: UsersRepository,
              private readonly configService: ConfigService) {
  }

  async handleGoogleSigninWithIdToken(idToken: string): Promise<any> {
    const client = new OAuth2Client(this.configService.get<string>("firebase.oauth.clientId"));
    //console.log(idToken);
    try {
      const decodedToken = await client.verifyIdToken({
        idToken: idToken,
        audience: this.configService.get<string[]>("firebase.oauth.audience"),
      })
      const userGoogleId = decodedToken.getUserId();
      const user = await this.usersRepository.findByGoogleId(userGoogleId);
      console.log(user);

      return user;
    } catch(e) {
      this.handleGoogleSignInException(e);
    }
  }

  handleGoogleSignInException(e) {
    if (`${e} `.includes('Token used too late')) {
      throw new HttpException(Exception.googleAccessTokenException.expired, HttpStatus.BAD_REQUEST);
    } else if (`${e} `.includes("Invalid token signature")) {
      throw new HttpException(Exception.googleAccessTokenException.invalidToken, HttpStatus.BAD_REQUEST);
    } else {
      throw new HttpException(Exception.googleAccessTokenException.invalidToken, HttpStatus.BAD_REQUEST);
    }
  }
};
