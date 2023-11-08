import { Workbook, Row, Cell, Worksheet } from 'exceljs';

export default class ExcelReader {
    private SheetName: string;
    private reference: string;
    private sheet: Worksheet;
    private map: Map<string, string> = new Map();

    constructor(SheetName: string, reference: string) {
        this.SheetName = SheetName;
        this.reference = reference;
    }

    public async initialiseRowValue(): Promise<Map<string, string>> {
        let workbook = new Workbook();
        let file = await workbook.xlsx.readFile("./src/resource/test-data.xlsx");
        this.sheet = file.getWorksheet(this.SheetName);
        return await this.getRowCompleteValue(await this.getRow(this.reference));
    }

    public async getRow(reference: string): Promise<number> {
        let rowNumber: number

        let arrayOfRow = this.sheet.getRows(1, this.sheet.rowCount);

        for (let value of arrayOfRow) {
            if (reference === (value.getCell(1)).toString()) {
                rowNumber = value.number
                break;
            }
        }
        return rowNumber;
    }

    public async getRowCompleteValue(rowNum: number): Promise<Map<string, string>> {
        let cellValue = this.sheet.getRow(rowNum);
        cellValue.eachCell(async (cellVal, number) => {
            this.map.set(this.sheet.getRow(1).getCell(number).toString(), cellVal.toString());
        })
        console.log(this.map);
        return this.map;
    }
}