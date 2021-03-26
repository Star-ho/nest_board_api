import { Entity, PrimaryGeneratedColumn,BaseEntity, Column, CreateDateColumn } from "typeorm";

@Entity()//테이블 정의시 사용
export class Board extends BaseEntity { //BaseEntity 상송받기 BaseEntity는 hasId, save, remove와 같은 기본 메서드 제공

  @PrimaryGeneratedColumn({//기본키 이면서 자동으로 생성되며 1씩을라감
    name: "id"
  })
  identifedNumber: number;

  @Column({length: 20})//제목
  id: string;

  @Column({length: 100})//내용
  pw: string;
  
  @CreateDateColumn()//작성날짜 글작성시 자동 생성
  createdAt: Date;
}

export default Board;
