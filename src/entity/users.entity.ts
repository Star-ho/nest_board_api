import { Entity, PrimaryGeneratedColumn,BaseEntity, Unique, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Board } from "./board.entity"

@Unique(["id"])
@Entity()//테이블 정의시 사용
export class Users extends BaseEntity { //BaseEntity 상속받기 BaseEntity는 hasId, save, remove와 같은 기본 메서드 제공

  @PrimaryGeneratedColumn({//기본키 이면서 자동으로 생성되며 1씩을라감
  name: "identification"
  })
  identifedNumber: number;

  @Column({length: 20,nullable:false})//ID
  id: string;

  @OneToMany(//Board테이블과 관계 설정
    (type)=>Board,
    Board=>Board.createUser
  )
  boards:Board[]
  
  @Column({length: 10,nullable:false})//ID
  username: string;

  @Column({length: 100,nullable:false})//pw
  password: string;
  
  @CreateDateColumn()//생성날짜
  createdAt: Date;
}

export default Users;
