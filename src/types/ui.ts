export type CSSVariable = React.CSSProperties & {
    [key: `--${string}`]: string | number | undefined;
}