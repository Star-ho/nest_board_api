import { Entity, PrimaryGeneratedColumn,BaseEntity, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Board extends BaseEntity {

  @PrimaryGeneratedColumn({
    name: "id"
  })
  id: number;

  @Column({length: 20})
  title: string;

  @Column({length: 100})
  text: string;
  
  @CreateDateColumn()
  createdAt: Date;
}

export default Board;
