import {IsDefined, IsNotEmpty, IsString} from "class-validator";

export class ProductRequest {
    @IsNotEmpty()
    @IsDefined()
    @IsString()
    plu: string


    @IsNotEmpty()
    @IsDefined()
    @IsString()
    name: string
}
