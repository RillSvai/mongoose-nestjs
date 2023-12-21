import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class RepositoryBase<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async findOne(
    filterQuery?: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return await this.model
      .findOne(filterQuery, {
        _id: 0,
        ...projection,
      })
      .exec();
  }

  async find(
    filterQuery: FilterQuery<T> = {},
    projection?: Record<string, unknown>,
  ): Promise<T[]> {
    return await this.model.find(filterQuery, {
      _id: 0,
      ...projection,
    });
  }

  async create(data: unknown): Promise<T> {
    const entity = new this.model(data);
    await entity.save();
    return entity;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    data: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return await this.model.findOneAndUpdate(filterQuery, data, {
      new: true,
    });
  }

  async deleteMany(filterQuery: FilterQuery<T>): Promise<boolean> {
    const res = await this.model.deleteMany(filterQuery);
    return res.deletedCount >= 1;
  }

  async deleteOne(filterQuery: FilterQuery<T>): Promise<boolean> {
    const res = await this.model.deleteOne(filterQuery);
    return res.deletedCount === 1;
  }
}
