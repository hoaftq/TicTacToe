import { should } from "chai";
import { describe, it } from "mocha";
import TTTGameLogic, { EMPTY_STATE, NORMAL_DEEP, O_STATE, X_STATE } from "../game.logic.js";

should();

/*
- - o
- o x
- - -
*/
describe('TTTGameLogic', function () {
    describe('getBestCellFor', function () {
        it("should return a good candidate", () => {
            const logic = new TTTGameLogic(NORMAL_DEEP);
            logic.cells = [
                [EMPTY_STATE, EMPTY_STATE, EMPTY_STATE],
                [EMPTY_STATE, O_STATE, EMPTY_STATE],
                [O_STATE, X_STATE, EMPTY_STATE]
            ];
            const r = logic.getBestCellFor(X_STATE);

            r.x.should.equal(0);
            r.y.should.equal(2);
        });
    })
});