import React from 'react';
import { IPost } from '../../../../types/post';
import classes from './PostItem.module.scss';
import placeholder from '../../../../static/media/avatar.png';
import { isImage, isLink } from '../../../../funcs';
interface IProps {
    post: IPost;
    avatar: string | undefined;
    name: string | undefined;
    isMyProfile: boolean;
    deletePost: (id: string) => void;
}

const PostItem: React.FC<IProps> = ({
    post,
    avatar,
    name,
    isMyProfile,
    deletePost,
}) => {
    const date = new Date(post.createdAt ? post.createdAt * 1000 : 0);
    const createdAt =
        date.toLocaleTimeString() + ' ' + date.toLocaleDateString();
    let postElements = post?.text?.split(' ').map((word, i) => {
        if (isLink(word)) {
            if (isImage(word)) {
                return (
                    <a key={i} href={word} target='blank_'>
                        <>
                            <br />
                            <img
                                src={word}
                                alt='xD'
                                width='250'
                                style={{
                                    borderRadius: '10px',
                                    padding: '5px',
                                }}
                            />
                            <br />
                        </>
                    </a>
                );
            } else {
                return (
                    <a
                        key={i}
                        href={word.match('http') ? word : `//${word}`}
                        target='blank_'
                        className={classes.link}
                        style={{ textDecoration: 'underline' }}
                    >
                        {word + ' '}
                    </a>
                );
            }
        }
        return <span key={i}>{word + ' '}</span>;
    });
    return (
        <div className={classes.wrapper}>
            <div className={classes.left}>
                <img src={avatar ? avatar : placeholder} alt='avatar' />
            </div>
            <div className={classes.right}>
                <div className={classes.top}>
                    <span className={classes.name}>{name}</span>

                    <div className={classes.sendedTime}>
                        <span>{createdAt}</span>
                    </div>
                    {isMyProfile && (
                        <div
                            className={classes.deleteButton}
                            onClick={() => deletePost(post.id)}
                        >
                            <span>✖</span>
                        </div>
                    )}
                </div>
                <div className={classes.bottom}>
                    <div className={classes.postData}>{postElements}</div>
                </div>
            </div>
        </div>
    );
};
export default PostItem;
