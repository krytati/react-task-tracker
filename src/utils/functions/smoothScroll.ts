export enum YDir {
    up = 'up',
    down = 'down'
}
export const smoothScroll = (direction: YDir, container: HTMLElement) => {
    const scrollAmount = 5;

    const scroll = () => {
        if (direction === YDir.down) {
            container.scrollBy(0, scrollAmount);
        } else {
            container.scrollBy(0, -scrollAmount);
        }

        if (
            (direction === YDir.down && container.scrollTop < container.scrollHeight - container.clientHeight) ||
            (direction === YDir.up && container.scrollTop > 0)
        ) {
            requestAnimationFrame(scroll);
        }
    };

    requestAnimationFrame(scroll);
};