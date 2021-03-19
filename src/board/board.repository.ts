import { Repository, EntityRepository } from "typeorm";
import { Board } from "../entity/board.entity"

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
}