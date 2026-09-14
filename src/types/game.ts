type CellValue = number | null;

export type BoardMatrix = CellValue[][];

export type BoardSize = {
    rows: number;
    columns: number;
};

export type Position = {
    x: number;
    y: number;
}