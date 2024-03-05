import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from './users';
import { Contract } from './contracts';
export enum AccidentStatus {
  APPROVED = 'approved',
  DECLINED = 'declined',
  UNDER_CONSIDERATION = 'under_consideration',
}
@Table({ tableName: 'accidents' })
export class Accident extends Model<Accident> {
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, allowNull: true })
  notes: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @BelongsTo(() => Contract)
  contract: Contract;

  @ForeignKey(() => Contract)
  @Column({ type: DataType.UUID, allowNull: false })
  contractId: string;

  @Column({ type: DataType.JSONB, allowNull: false })
  victims: string;

  @Column({
    type: DataType.ENUM(...Object.values(AccidentStatus)),
    allowNull: false,
  })
  status: AccidentStatus;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
