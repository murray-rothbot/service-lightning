import { IsString } from 'class-validator'

export class NodeRequestDto {
  @IsString()
  pubKey: string
}
