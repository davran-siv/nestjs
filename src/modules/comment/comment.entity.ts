import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { UserEntity } from '../user/user.entity'

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'comment_text', type: 'varchar', length: 1000 })
  commentText: string

  @ManyToOne(type => UserEntity)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity

  @ManyToOne(type => CommentEntity, comment => comment.replies)
  @JoinColumn({ name: 'replied_to_comment_id' })
  repliedToComment: CommentEntity

  @OneToMany(type => CommentEntity, comment => comment.repliedToComment)
  replies: CommentEntity[]

  @Column({ name: 'created_at', type: 'time with time zone', nullable: false })
  createdAt: Date

  @Column({ name: 'updated_at', type: 'time with time zone' })
  updatedAt: Date

  @BeforeInsert()
  setCreatedAtDate() {
    this.createdAt = new Date()
  }

  @BeforeUpdate()
  setUpdatedAtDate() {
    this.updatedAt = new Date()
  }

}