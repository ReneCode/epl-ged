
import IaLine from './IaLine';
import IaPoint from './IaPoint';
import IaRectangle from './IaRectangle';
import IaSymbol from './IaSymbol';
import IaClear from './IaClear';

export default class IaRegister {
    constructor(iaManager) {
        new IaLine(iaManager);
        new IaPoint(iaManager);
        new IaRectangle(iaManager);
        new IaSymbol(iaManager);
        new IaClear(iaManager);

    }
}