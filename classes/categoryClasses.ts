export class DeleteActionReturnClass {
  constructor(message: string) {
    const res = { message: message, pathname: "", parentId: 0 };
  }
}
export class CreateCategoryActionReturnVal {
  static createReturnValue(message: string): {
    message: string;
    pathname: string;
    parentId: number;
  } {
    return { message: message, pathname: "", parentId: 0 };
  }
}