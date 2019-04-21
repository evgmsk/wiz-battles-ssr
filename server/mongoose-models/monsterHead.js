/**
 * project WizBattle
 */
import mongoose from 'mongoose';

const MonsterHead = new mongoose.Schema({
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

const MonsterHeads = mongoose.model('MonsterHead', MonsterHead);
module.exports = MonsterHeads;
