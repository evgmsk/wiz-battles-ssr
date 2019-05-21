/**
 * project WizBattle
 */

import mongoose from 'mongoose';

const MonsterBody = new mongoose.Schema({
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

const MonsterBodies = mongoose.model('MonsterBody', MonsterBody);
module.exports = MonsterBodies;
