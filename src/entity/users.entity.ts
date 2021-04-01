import { Entity, PrimaryGeneratedColumn,BaseEntity, Unique, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Board } from "./board.entity"

@Unique(["id"])
@Entity()
export class Users extends BaseEntity { 

  @PrimaryGeneratedColumn({
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
