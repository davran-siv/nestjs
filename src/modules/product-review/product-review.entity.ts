import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CommentEntity } from '../comment/comment.entity'
import { ProductEntity } from '../product/entities/product.entity'
import { UserEntity } from '../user/user.entity'

@Entity('product_reviews')
export class ProductReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'smallint' })
  mark: number

  @ManyToOne(type => UserEntity)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity

  @ManyToOne(type => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity

  @OneToOne(type => CommentEntity)
  @JoinColumn({ name: 'comment_id' })
  comment: CommentEntity

  @OneToOne(type => CommentEntity)
  @JoinColumn({ name: 'after_usage_comment_id' })
  afterUsageComment: CommentEntity


}