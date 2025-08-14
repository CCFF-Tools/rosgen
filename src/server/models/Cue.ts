import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface CueAttributes {
  id: number;
  time: number;
  duration: number;
  title: string;
  description?: string;
  owner?: string;
}

export type CueCreationAttributes = Optional<CueAttributes, 'id'>;

export class Cue
  extends Model<CueAttributes, CueCreationAttributes>
  implements CueAttributes
{
  public id!: number;
  public time!: number;
  public duration!: number;
  public title!: string;
  public description?: string;
  public owner?: string;
}

export function initCue(sequelize: Sequelize): typeof Cue {
  Cue.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      owner: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'cues',
      timestamps: false,
    },
  );

  return Cue;
}
