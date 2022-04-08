import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm';
import { AuthorModule } from './author/author.module';
import { CommentModule } from './comment/comment.module';
import { commentsDataLoader } from './comment/coments.loader';
import { CommentService } from './comment/comment.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [CommentModule, BookModule],
      driver: ApolloDriver,
      useFactory: (commentService: CommentService) => ({
        playground: true,
        autoSchemaFile: join(process.cwd(), 'src/schemas/schema.gql'),
        sortSchema: true,
        context: {
          commentsLoader: commentsDataLoader(commentService),
        },
      }),
      inject: [CommentService],
    }),
    BookModule,
    AuthorModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
