/**
 * project WizBattle
 */
import mongoose from 'mongoose';

const MonsterLeg = new mongoose.Schema({
        id: {
            type: Number,
        },
        catalog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Monsters',
        },
        name: {
            type: String,
        },
        nodeType: {
            type: String,
        },
        image: {
            type: Array,
        },
    },
    {
        timestamps: true,
    });

const MonsterLegs = mongoose.model('MonsterLeg', MonsterLeg);
module.exports = MonsterLegs;
