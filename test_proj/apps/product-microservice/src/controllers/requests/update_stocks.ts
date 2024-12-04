import {IsNumber, IsOptional} from "class-validator";

export class Update_stocks {
    @IsOptional()
    @IsNumber()
    quantity_on_shelf: number;

    @IsOptional()
    @IsNumber()
    quantity_in_order: number;
}
