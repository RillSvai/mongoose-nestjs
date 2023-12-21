export abstract class MockModel<T> {
  protected abstract entityStub: T;

  constructor(data: T) {
    this.constructorSpy(data);
  }
  constructorSpy(_data: T): void {}

  findOne(): { exec: () => T } {
    return {
      exec: (): T => this.entityStub,
    };
  }
  find(): T[] {
    return [this.entityStub];
  }

  async save(): Promise<T> {
    return this.entityStub;
  }

  async findOneAndUpdate(): Promise<T> {
    return this.entityStub;
  }
}
