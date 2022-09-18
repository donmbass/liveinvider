import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Comment } from 'react-loader-spinner';
import { getPreEmitDiagnostics } from 'typescript';
import { useAppDispatch, useAppSelector } from '../../../hooks/react-redux';
import { useWall } from '../../../hooks/wall-hooks';
import { increasePostsLimit } from '../../../store/profileSlice';
import PostItem from './postItem/PostItem';
import classes from './PostsList.module.scss';
interface IProps {
    uid: string | undefined;
    avatar: string | undefined;
    name: string | undefined;
    isMyProfile: boolean;
}
const PostsList: React.FC<IProps> = ({ uid, avatar, name, isMyProfile }) => {
    const dispatch = useAppDispatch();
    const wall = useWall();
    const posts = useAppSelector((state) => state.profileSlice.posts);
    const isAllLoaded = useAppSelector(
        (state) => state.profileSlice.isAllLoaded
    );
    const limit = useAppSelector((state) => state.profileSlice.limit);
    useEffect(() => {
        if (uid) {
            wall.loadPosts(uid, limit);
        }
    }, [uid, limit]);

    const loadMore = () => {
        dispatch(increasePostsLimit());

        if (uid) {
            wall.loadPosts(uid, limit);
        }
    };
    const deletePost = (id: string) => {
        wall.deletePost(id);
        if (uid) {
            wall.loadPosts(uid, limit);
        }
    };

    if (posts?.length) {
        return (
            <div id='scrollableDiv' className={classes.wrapper}>
                <h2 className={classes.postsTitle}>Публикации</h2>
                <InfiniteScroll
                    dataLength={posts.length}
                    next={loadMore}
                    hasMore={true}
                    loader={<></>}
                >
                    {posts?.map((post, i) => (
                        <PostItem
                            post={post}
                            key={i}
                            avatar={avatar}
                            name={name}
                            isMyProfile={isMyProfile}
                            deletePost={deletePost}
                        />
                    ))}
                </InfiniteScroll>
            </div>
        );
    }
    return (
        <h2 className={classes.postsTitle} style={{ marginTop: '30px' }}>
            Публикаций нет
        </h2>
    );
};
export default PostsList;
