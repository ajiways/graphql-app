import DataLoader from 'dataloader';
import { groupBy, map } from 'ramda';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';

export const commentsDataLoader = (commentService: CommentService) => {
  return new DataLoader<number, Comment[]>(async (ids) => {
    const comments = await commentService.getCommentsByIds(ids as number[]);

    const groupedBy = groupBy((comment) => String(comment.bookId), comments);

    return map((id) => groupedBy[id], ids);
  });
};
