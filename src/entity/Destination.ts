import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("destination")
export class Destination {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @Column()
    httpMethod: string

    @Column('text', {nullable: false })
    headers: string

    @Column()
    accountId: string

    @Column({ default: 0 })
    isDeleted: number

}

