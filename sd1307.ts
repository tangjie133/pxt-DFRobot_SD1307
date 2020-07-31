
/**
 * DS1307 block
 */
//% weight=10 color=#e7660b icon="\uf252" block="SD1307"
namespace DFRobot_DS1307 {
    let DS1307_I2C_ADDR = 104;
    
    export enum TIME{
        //% blockId=DS1307_Year block="Year"
        DS1307_REG_YEAR = 6,
        //% blockId=DS1307_Month block="Month"
        DS1307_REG_MONTH = 5,
        //% blockId=DS1307_Day block="Day"
        DS1307_REG_DAY = 4,
        //% blockId=DS1307_Weekday block="Weekday"
        DS1307_REG_WEEKDAY = 3,
        //% blockId=DS1307_Hour block="Hour"
        DS1307_REG_HOUR = 2,
        //% blockId=DS1307_Minute block="Minute"
        DS1307_REG_MINUTE = 1,
        //% blockId=DS1307_Second block="Second"
        DS1307_REG_SECOND = 0,
    }

    /**
     * set ds1307's reg
     */
    function setReg(reg: number, data: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = data;
        pins.i2cWriteBuffer(DS1307_I2C_ADDR, buf);
    }

    /**
     * get ds1307's reg
     */
    function getReg(reg: number): number {
        pins.i2cWriteNumber(DS1307_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(DS1307_I2C_ADDR, NumberFormat.UInt8BE);
    }

    /**
     * convert a Hex data to Dec
     */
    function HexToDec(data: number): number {
        return (data >> 4) * 10 + (data % 16);
    }

    /**
     * convert a Dec data to Hex
     */
    function DecToHex(data: number): number {
        return Math.idiv(data, 10) * 16 + (data % 10)
    }

    /**
     * start ds1307 (go on)
     */
    //% blockId="DS1307_START" block="start"
    //% weight=80
    //% parts=DS1307 trackArgs=0
    export function start() {
        let t = getDataTime(DFRobot_DS1307.TIME.DS1307_REG_SECOND)
        setSecond(t & 0x7f)
    }

    /**
     * stop ds1307 (pause)
     */
    //% blockId="DS1307_STOP" block="pause"
    //% weight=70 
    //% parts=DS1307 trackArgs=0
    export function stop() {
        let t = getDataTime(DFRobot_DS1307.TIME.DS1307_REG_SECOND)
        setSecond(t | 0x80)
    }

    /**
     * set year
     * @param dat is the Year will be set, eg: 2018
     */
    //% blockId="DS1307_SET_YEAR" block="set year %data"
    //% weight=69 
    //% parts=DS1307 trackArgs=0
    export function setYear(data: number): void {
        setReg(DFRobot_DS1307.TIME.DS1307_REG_YEAR, DecToHex(data % 100))
    }

    /**
     * set month
     * @param dat is Month will be set.  eg: 2
     */
    //% blockId="DS1307_SET_MONTH" block="set month %data"
    //% weight=68 
    //% dat.min=1 dat.max=12
    //% parts=DS1307 trackArgs=0
    export function setMonth(data: number): void {
        setReg(DFRobot_DS1307.TIME.DS1307_REG_MONTH, DecToHex(data % 13))
    }

    /**
     * set day
     * @param dat is the Day will be set, eg: 15
     */
    //% blockId="DS1307_SET_DAY" block="set day %dat"
    //% weight=67 
    //% dat.min=1 dat.max=31
    //% parts=DS1307 trackArgs=0
    export function setDay(data: number): void {
        setReg(DFRobot_DS1307.TIME.DS1307_REG_DAY, DecToHex(data % 32))
    }

    /**
     * set weekday
     * @param dat is the Week Day will be set, eg: 4
     */
    //% blockId="DS1307_SET_WEEKDAY" block="set weekday %data"
    //% weight=66
    //% dat.min=1 dat.max=7
    //% parts=DS1307 trackArgs=0
    export function setWeekday(data: number): void {
        setReg(DFRobot_DS1307.TIME.DS1307_REG_WEEKDAY, DecToHex(data % 8))
    }

    /**
     * set hour
     * @param dat is the Hour will be set, eg: 0
     */
    //% blockId="DS1307_SET_HOUR" block="set hour %data"
    //% weight=65 
    //% dat.min=0 dat.max=23
    //% parts=DS1307 trackArgs=0
    export function setHour(data: number): void {
        setReg(DFRobot_DS1307.TIME.DS1307_REG_HOUR, DecToHex(data % 24))
    }

    /**
     * set minute
     * @param dat is the Minute will be set, eg: 0
     */
    //% blockId="DS1307_SET_MINUTE" block="set minute %data"
    //% weight=64 
    //% dat.min=0 dat.max=59
    //% parts=DS1307 trackArgs=0
    export function setMinute(data: number): void {
        setReg(DFRobot_DS1307.TIME.DS1307_REG_MINUTE, DecToHex(data % 60))
    }

    /**
     * set second
     * @param dat is the Second will be set, eg: 0
     */
    //% blockId="DS1307_SET_SECOND" block="set second %data"
    //% weight=63 
    //% dat.min=0 dat.max=59
    //% parts=DS1307 trackArgs=0
    export function setSecond(data: number): void {
        setReg(DFRobot_DS1307.TIME.DS1307_REG_SECOND, DecToHex(data % 60))
    }

    /**
     * set Date and Time
     * @param year is the Year will be set, eg: 2020
     * @param month is the Month will be set, eg: 7
     * @param day is the Day will be set, eg: 31
     * @param weekday is the Weekday will be set, eg: 5
     * @param hour is the Hour will be set, eg: 15
     * @param minute is the Minute will be set, eg: 0
     * @param second is the Second will be set, eg: 0
     */
    //% blockId="DS1307_SET_DATETIME" block="set %year year||%month month |%day day |%weekday weekday |%hour hour |%minute minute |%second second "
    //% weight=60 
    //% inlineInputMode=inline
    //% parts=DS1307 trackArgs=0
    export function setDataTime(year: number, month?: number, day?: number, weekday?: number, hour?: number, minute?: number, second?: number): void {
        let buf = pins.createBuffer(8);
        buf[0] = DFRobot_DS1307.TIME.DS1307_REG_SECOND;
        buf[1] = DecToHex(second % 60);
        buf[2] = DecToHex(minute % 60);
        buf[3] = DecToHex(hour % 24);
        buf[4] = DecToHex(weekday % 8);
        buf[5] = DecToHex(day % 32);
        buf[6] = DecToHex(month % 13);
        buf[7] = DecToHex(year % 100);
        pins.i2cWriteBuffer(DS1307_I2C_ADDR, buf)
    }


  /**
   * get SD1307 time
   */
  //% blockId="DS1307_GET_TIME" block="get SD1307 time %data"
  //% weight=60 
  export function getDataTime(data:TIME):number{
    let _number
    switch(data){
    case DFRobot_DS1307.TIME.DS1307_REG_SECOND:
        _number = Math.min(HexToDec(getReg(DFRobot_DS1307.TIME.DS1307_REG_SECOND)), 59)
        break;
    case DFRobot_DS1307.TIME.DS1307_REG_MINUTE:
        _number = Math.min(HexToDec(getReg(DFRobot_DS1307.TIME.DS1307_REG_MINUTE)), 59)
        break;
    case DFRobot_DS1307.TIME.DS1307_REG_HOUR:
        _number = Math.min(HexToDec(getReg(DFRobot_DS1307.TIME.DS1307_REG_HOUR)), 23)
        break;
    case DFRobot_DS1307.TIME.DS1307_REG_WEEKDAY:
        _number = Math.max(Math.min(HexToDec(getReg(DFRobot_DS1307.TIME.DS1307_REG_WEEKDAY)), 7), 1)
        break;
    case DFRobot_DS1307.TIME.DS1307_REG_DAY:
        _number = Math.max(Math.min(HexToDec(getReg(DFRobot_DS1307.TIME.DS1307_REG_DAY)), 31), 1)
        break;
    case DFRobot_DS1307.TIME.DS1307_REG_MONTH:
        _number = Math.max(Math.min(HexToDec(getReg(DFRobot_DS1307.TIME.DS1307_REG_MONTH)), 12), 1)
        break;
    default:
        _number = Math.min(HexToDec(getReg(DFRobot_DS1307.TIME.DS1307_REG_YEAR)), 99) + 2000
    }
    return _number
  }

  /**
   * Data judgment
   */
  //% blockId="DS1307_DATA_JUDGMENT" block=" if time %time equals %data"
  //% weight=50 
  export function dataJudgemt(time:TIME, data:number): boolean {
    let _number
    switch(data){
    case DFRobot_DS1307.TIME.DS1307_REG_SECOND:
        _number = Math.min(HexToDec(getReg(DFRobot_DS1307.TIME.DS1307_REG_SECOND)), 59)
        break;
    case DFRobot_DS1307.TIME.DS1307_REG_MINUTE:
        _number = Math.min(HexToDec(getReg(DFRobot_DS1307.TIME.DS1307_REG_MINUTE)), 59)
        break;
    case DFRobot_DS1307.TIME.DS1307_REG_HOUR:
        _number = Math.min(HexToDec(getReg(DFRobot_DS1307.TIME.DS1307_REG_HOUR)), 23)
        break;
    case DFRobot_DS1307.TIME.DS1307_REG_WEEKDAY:
        _number = Math.max(Math.min(HexToDec(getReg(DFRobot_DS1307.TIME.DS1307_REG_WEEKDAY)), 7), 1)
        break;
    case DFRobot_DS1307.TIME.DS1307_REG_DAY:
        _number = Math.max(Math.min(HexToDec(getReg(DFRobot_DS1307.TIME.DS1307_REG_DAY)), 31), 1)
        break;
    case DFRobot_DS1307.TIME.DS1307_REG_MONTH:
        _number = Math.max(Math.min(HexToDec(getReg(DFRobot_DS1307.TIME.DS1307_REG_MONTH)), 12), 1)
        break;
    default:
        _number = Math.min(HexToDec(getReg(DFRobot_DS1307.TIME.DS1307_REG_YEAR)), 99) + 2000
    }
    if(_number==data){
        return true;
    }else{
       return false;
    }
  }
}
