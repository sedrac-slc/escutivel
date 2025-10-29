export interface CrudService<T> {
 findAll(): Promise<T[]>
 create(data: T): Promise<T>
 update(data: T, id: string): Promise<T>
 delete(data: T): Promise<boolean>
}