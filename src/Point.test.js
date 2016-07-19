import expect from 'expect';
import Point from './Point';

describe('Point', () => {
    it('should create Point', () => {
        let pt = new Point(34,62);
        expect(pt.x).toBe(34);  
        expect(pt.y).toBe(62);  
    });

    it('should return added Point', () => {
        let pt = new Point(10, 20);
        let add = new Point(6, 7);
        let result = pt.add(add);
        expect(result.x).toBe(16);
        expect(result.y).toBe(27);
    });

});