import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Log {
    @PrimaryGeneratedColumn()
    id = undefined;

    @Column('varchar')
    record = '';
}
