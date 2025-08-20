import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('articles')
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    // Add other properties as needed, e.g., title, content, author, etc.
}
