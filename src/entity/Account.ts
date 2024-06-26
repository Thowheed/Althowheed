import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("account")
export class Account {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    emailId: string

    @Column()
    accountId: string

    @Column()   
    accountName: string

    @Column()
    appSecretToken: string

    @Column()
    website: string

    @Column({ default: 0 })
    isDeleted: number

}

