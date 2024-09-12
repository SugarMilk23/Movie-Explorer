import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Rating } from "./Rating";

@Entity()
export class User {
  @PrimaryColumn({ nullable: false })
  user_name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];
}
