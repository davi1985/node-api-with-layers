import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../lib/database-connection'

export interface ITask extends Model {
  id: string
  title: string
  done: boolean
}

export const Task = sequelize.define<ITask>(
  'Task',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'tasks',
    timestamps: false,
  }
)
