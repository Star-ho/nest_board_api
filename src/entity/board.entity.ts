import { Entity, PrimaryGeneratedColumn,BaseEntity, Column, CreateDateColumn,ManyToOne } from "typeorm";
import { Users } from "./users.entity"

@Entity()//테이블 정의시 사용
export class Board extends BaseEntity { 
  //BaseEntity 상속
  //BaseEntity는 hasId, save, remove와 같은 기본 메서드 제공

  @PrimaryGeneratedColumn({//기본 자동으로 생성 1씩 증가
    name: "id"
  })
  id: number;

  @Column({length: 20})//제목
  title: string;

  @Column({length: 100})//내용
  text: string;
  
  @CreateDateColumn()//작성날짜 글작성시 자동 생성
  createdAt: Date;

  @ManyToOne(type=>Users,Users=>Users.boards,
    { onDelete: 'CASCADE' })//Users테이블과 관계 생성
    user : Users;
}

export default Board;
