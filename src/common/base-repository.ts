import {
  Document,
  FilterQuery,
  Model,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

export class BaseRepository<T extends Document> {
  constructor(private readonly model: Model<T>) { }

  async create(data): Promise<any> {
    const createdEntity = new this.model(data);
    return await createdEntity.save();
  }

  async findById(id: string, option?: QueryOptions | null): Promise<T | null> {
    return this.model.findById(id, option);
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

  async getByCondition(
    filter,
    field?: any | null,
    option?: any | null,
    populate?: any | null,
  ): Promise<T[]> {
    return this.model.find(filter, field, option).populate(populate);
  }

  async findAll(select?: string, sort?: { [key: string]: any }): Promise<T[]> {
    return this.model.find().select(select).sort(sort).lean();
  }

  async deleteOne(id: string) {
    return this.model.deleteOne({ _id: id } as FilterQuery<T>);
  }

  async deleteMany(id: string[]) {
    return this.model.deleteMany({ _id: { $in: id } } as FilterQuery<T>);
  }

  async deleteByCondition(filter) {
    return this.model.deleteMany(filter);
  }

  async findByConditionAndUpdate(filter, update) {
    return this.model.findOneAndUpdate(filter as FilterQuery<T>, update, {
      new: true,
    });
  }

  async updateMany(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    option?: QueryOptions | null,
  ) {
    return await this.model.updateMany(filter, update, option);
  }

  async findByIdAndUpdate(id, update) {
    return this.model.findByIdAndUpdate(id, update, { new: true });
  }

  async findWithFilterAndPagination(
    page = 1,
    limit = 20,
    query?: any,
    select?: string,
    sort?: { [key: string]: any },
  ): Promise<{ data: T[]; total: number; totalPages: number }> {
    const skip = (page - 1) * limit;
    const countQuery = this.model.find(query).select(select);
    const total = await countQuery.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const data = await this.model
      .find(query)
      .select(select)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    return {
      data: data as T[],
      total,
      totalPages,
    };
  }
}
