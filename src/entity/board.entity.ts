import { Entity, PrimaryGeneratedColumn,BaseEntity, Column, CreateDateColumn,ManyToOne } from "typeorm";
import { Users } from "./users.entity"

@Entity()//테이블 정의시 사용
export class Board extends BaseEntity { //BaseEntity 상송받기 BaseEntity는 hasId, save, remove와 같은 기본 메서드 제공

  @PrimaryGeneratedColumn({//기본키 이면서 자동으로 생성되며 1씩을라감
    name: "id"
  })
  id: number;

  @Column({length: 20})//제목
  title: string;

  @Column({length: 100})//내용
  text: string;
  
  @CreateDateColumn()//작성날짜 글작성시 자동 생성
  createdAt: Date;

  @Column()
  createUser : String
}

export default Board;
