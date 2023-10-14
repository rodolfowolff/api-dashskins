import { Document, FilterQuery, Model, QueryOptions } from 'mongoose';

export class BaseRepository<T extends Document> {
  constructor(private readonly model: Model<T>) { }

  async create(data): Promise<any> {
    const createdEntity = new this.model(data);
    return await createdEntity.save();
  }

  async findByCondition(
    filter: FilterQuery<T>,
    field?: any | null,
    option?: QueryOptions | null,
    populate?: any | null,
  ): Promise<T | null> {
    const query = this.model.findOne(filter, field, option);
    if (populate) {
      query.populate(populate);
    }
    return query.exec();
  }

  async findAll(select?: string, sort?: { [key: string]: any }): Promise<T[]> {
    return this.model.find().select(select).sort(sort).lean();
  }

  async findByIdAndUpdate(id, update) {
    return this.model.findByIdAndUpdate(id, update, { new: true });
  }

  async findByIdAndDelete(id) {
    return this.model.findByIdAndDelete(id);
  }
}
