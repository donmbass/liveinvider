export const isLink = (text: string) => {
    return (
        text.match('http://') ||
        text.match('https://') ||
        text.match('www.') ||
        text.match('.ru') ||
        text.match('.com') ||
        text.match('.net') ||
        text.match('.org') ||
        text.match('.info') ||
        text.match('.me') ||
        text.match('.eu')
    );
};

export const isImage = (text: string) => {
    return (
        text.match('.png') ||
        text.match('.jpg') ||
        text.match('.jpeg') ||
        text.match('.webp') ||
        text.match('.gif')
    );
};
