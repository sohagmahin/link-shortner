import { Column, Entity } from 'typeorm';

@Entity()
export class URL {
  @Column({ primary: true })
  id: string;
  @Column()
  url: string;
}
