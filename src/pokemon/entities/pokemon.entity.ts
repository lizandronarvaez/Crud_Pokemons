import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Este documento es el que controla la base de datos, como las restricciones ala hora de insertar los datos
@Schema()
export class Pokemon extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  no: number;

  @Prop({
    unique: true,
    index: true,
  })
  name: string;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
