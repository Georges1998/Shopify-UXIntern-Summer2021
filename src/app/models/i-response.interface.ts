export interface IResponse<T> {
  totalResults: number;
  Search: Array<T>;
  Response: String;
  Error: String;
}
