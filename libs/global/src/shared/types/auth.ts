/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface SuccessMessage {
  message: string;
}

export interface PasswordChangeRequestDto {
  oldPassword: string;
  newPassword: string;
}

export interface SingUpRequestDto {
  id: string;
  name: string;
  surName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  passportCode: string;
}

export interface SingInRequestDto {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  surName: string;
  email: string;
  password: string;
  phone: string;
  passportCode: string;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  signUp(request: SingUpRequestDto): Observable<User>;

  signIn(request: SingInRequestDto): Observable<SuccessMessage>;

  passwordChange(request: PasswordChangeRequestDto): Observable<SuccessMessage>;
}

export interface AuthServiceController {
  signUp(request: SingUpRequestDto): Promise<User> | Observable<User> | User;

  signIn(request: SingInRequestDto): Promise<SuccessMessage> | Observable<SuccessMessage> | SuccessMessage;

  passwordChange(
    request: PasswordChangeRequestDto,
  ): Promise<SuccessMessage> | Observable<SuccessMessage> | SuccessMessage;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["signUp", "signIn", "passwordChange"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
