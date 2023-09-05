import { IsNotEmpty, IsString } from 'class-validator'

export interface SchemeProps {
  channel: string
  username: string
  clientId: string
  clientSecret: string
  oauthToken: string
}

export class Scheme {
  @IsNotEmpty()
  @IsString()
  public username: string

  @IsNotEmpty()
  @IsString()
  public clientId: string

  @IsNotEmpty()
  @IsString()
  public clientSecret: string

  @IsNotEmpty()
  @IsString()
  public channel: string

  @IsNotEmpty()
  @IsString()
  public oauthToken: string

  constructor(options: SchemeProps) {
    this.channel = options.channel
    this.username = options.username
    this.clientId = options.clientId
    this.clientSecret = options.clientSecret
    this.oauthToken = options.oauthToken
  }
}
